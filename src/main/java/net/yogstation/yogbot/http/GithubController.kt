package net.yogstation.yogbot.http

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.`object`.entity.channel.MessageChannel
import discord4j.core.`object`.entity.channel.TextChannel
import discord4j.core.spec.EmbedCreateSpec
import discord4j.rest.util.Color
import net.yogstation.yogbot.ByondConnector
import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.config.GithubConfig
import net.yogstation.yogbot.http.labels.GithubLabel
import net.yogstation.yogbot.util.HttpUtil
import net.yogstation.yogbot.util.StringUtils
import net.yogstation.yogbot.util.YogResult
import org.springframework.http.HttpEntity
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.bodyToMono
import reactor.core.publisher.Mono
import java.net.URI
import java.security.MessageDigest
import java.util.*
import java.util.regex.Pattern
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

@RestController
class GithubController(
	private val webClient: WebClient,
	private val mapper: ObjectMapper,
	private val githubConfig: GithubConfig,
	private val byondConnector: ByondConnector,
	private val client: GatewayDiscordClient,
	private val channelsConfig: DiscordChannelsConfig,
	private val githubLabels: List<GithubLabel>
) {
	private val keySpec: SecretKeySpec = SecretKeySpec(githubConfig.hmac.encodeToByteArray(), "HmacSHA256")
	private val mac: Mac = Mac.getInstance("HmacSHA256")

	init {
		mac.init(keySpec)
	}

	@PostMapping("/github")
	fun handleWebhook(
		@RequestBody data: String,
		@RequestHeader("X-Hub-Signature-256") hash: String,
		@RequestHeader("X-Github-Event") event: String
	): Mono<HttpEntity<String>> {
		if (!verifySignature(data, hash)) return HttpUtil.badRequest("Hash Incorrect")
		if (event == "ping") return HttpUtil.ok("pong")
		val jsonData: JsonNode = mapper.readTree(data)
		var resultPublishers: Mono<*> = Mono.empty<Any>()
		if (event == "pull_request") {
			val changelogResult = compileChangelog(jsonData.get("pull_request").get("body").asText() ?: "")
			val embed: EmbedCreateSpec = getEventPrEmbed(
				jsonData,
				changelogResult
			)
			var action = jsonData.get("action").asText()
			if (action != "opened" && action != "reopened" && action != "closed") {
				return HttpUtil.ok("Action not supported");
			}
			if(jsonData.get("pull_request").get("merged") != null) action = "merged"
			val title = jsonData.get("pull_request").get("title").asText()
			val securityPr = title.lowercase().contains("[s]")

			if (title.lowercase().contains("[admin]")) {
				resultPublishers = resultPublishers.and(sendEmbedTo(channelsConfig.channelImportantAdmin, embed))
			}

			if(!securityPr){
				if (action == "opened") {
					byondConnector.request(
						"?announce=$title&author=${jsonData.get("sender").get("login")
						}&id=${jsonData.get("pull_request").get("number")}"
					)
				}

				resultPublishers = resultPublishers.and(sendEmbedTo(channelsConfig.channelPublic, embed))
				resultPublishers = resultPublishers.and(sendEmbedTo(channelsConfig.channelDevelopmentPublic, embed))
				resultPublishers = resultPublishers.and(sendEmbedTo(channelsConfig.channelGithubSpam, embed))
			} else {
				resultPublishers = resultPublishers.and(sendEmbedTo(channelsConfig.channelMaintainerChat, embed))
			}

			resultPublishers = resultPublishers.and(makeRequest("${jsonData.get("pull_request").get("_links").get("self").get("href").asText()}/files")
				.bodyToMono(String::class.java)
				.flatMap { responseString ->
					var extensionsReturn: Mono<*> = Mono.empty<Any>()
					val extensions: MutableSet<String> = HashSet()
					val filesJson: JsonNode = mapper.readTree(responseString)
					val extensionPattern: Pattern = Pattern.compile(".*\\.(\\w+)")
					filesJson.elements().forEach {
						val matcher = extensionPattern.matcher(it.get("filename").asText())
						if(matcher.matches())
							extensions.add(matcher.group(1))
					}
					if(!securityPr) {
						if(extensions.contains("dmm")) {
							extensionsReturn = extensionsReturn.and(sendEmbedTo(channelsConfig.channelMapping, embed))
						}
						if(extensions.contains("dmi") || extensions.contains("ogg")) {
							extensionsReturn = extensionsReturn.and(sendEmbedTo(channelsConfig.channelSpriter, embed))
						}
					}

					val labels: List<String> = githubLabels.filter{ it.isMatch(jsonData, changelogResult.value, extensions) }.map(GithubLabel::label)

					extensionsReturn.and(webClient.post()
						.uri(URI.create("${jsonData.get("pull_request").get("issue_url").asText()}/labels"))
						.header("Authorization", "token ${githubConfig.token}")
						.header("User-Agent", "Yogbot13")
						.contentType(MediaType.APPLICATION_JSON)
						.bodyValue(labels)
						.retrieve()
						.bodyToMono<Void>())
				})

			if(action == "merged" && changelogResult.value != null) {
				val changelogFile: StringBuilder = StringBuilder("author: \"")
				val author = changelogResult.value.author ?: jsonData.get("pull_request").get("user").get("login").asText()
				changelogFile.append(author)
				changelogFile.append("\"\ndelete-after: true \nchanges: \n")

				for(change in changelogResult.value.entries) {
					val body = change.body.replace("\"", "\\\\\"").replace("<", "")
					changelogFile.append("  - ${change.type}: \"$body\"\n")
				}
				val branch = jsonData.get("pull_request").get("base").get("ref").asText()
				val repo = jsonData.get("pull_request").get("base").get("repo").get("url").asText()
				val filename = "html/changelogs/AutoChangelog-pr-${jsonData.get("pull_request").get("number").asText()}.yml"
				val commit = "Automatic changelog generation #${jsonData.get("pull_request").get("number").asText()} [ci skip]"

				resultPublishers = resultPublishers.and(webClient.put()
					.uri(URI.create("$repo/contents/$filename"))
					.header("Authorization", "token ${githubConfig.token}")
					.header("User-Agent", "Yogbot13")
					.contentType(MediaType.APPLICATION_JSON)
					.bodyValue(IssueSubmitDTO(
						branch,
						commit,
						Base64.getEncoder().encodeToString(changelogFile.toString().encodeToByteArray())
					))
					.retrieve()
					.bodyToMono<Void>())
			}
		}
		return resultPublishers.then(HttpUtil.ok("Request processed"))
	}

	private fun sendEmbedTo(channelId: Long, embed: EmbedCreateSpec): Mono<*> {
		return client.getChannelById(Snowflake.of(channelId)).flatMap {
			if (it is TextChannel) it.createMessage(embed)
			else Mono.empty<Any>()
		}
	}

	private fun verifySignature(data: String, hash: String): Boolean {
		val signature = "sha256=${StringUtils.bytesToHex(mac.doFinal(data.encodeToByteArray()))}".lowercase()
		return MessageDigest.isEqual(signature.encodeToByteArray(), hash.encodeToByteArray())
	}

	fun postPR(channel: MessageChannel, prNumber: String): Mono<*> {

		return makeRequest("${githubConfig.repoLink}/pulls/$prNumber")
			.onStatus({ responseCode -> responseCode == HttpStatus.NOT_FOUND }, {
				makeRequest("${githubConfig.repoLink}/issues/$prNumber")
					.toEntity(String::class.java)
					.flatMap { issueEntity -> channel.createMessage(getIssueEmbed(issueEntity.body)) }
					.then(Mono.empty())
			})
			.toEntity(String::class.java)
			.flatMap { prEntity ->
				if (prEntity.statusCode.is2xxSuccessful) channel.createMessage(
					getManualPrEmbed(
						mapper.readTree(prEntity.body)
					)
				) else Mono.empty<Any>()
			}
	}

	private fun getEventPrEmbed(data: JsonNode, changelog: YogResult<Changelog?, String?>): EmbedCreateSpec {
		return getPrEmbed(
			data.get("pull_request"),
			"A PR has been ${data.get("action").asText()} by ${data.get("sender").get("login").asText()}",
			changelog
		)
	}

	private fun getManualPrEmbed(data: JsonNode): EmbedCreateSpec {
		if (data.get("message") != null) return EmbedCreateSpec.create().withTitle("Unable to get PR")
		return getPrEmbed(data, changelog = compileChangelog(data.get("body").asText() ?: ""))
	}

	private fun getPrEmbed(
		data: JsonNode, titleOverride: String? = null, changelog: YogResult<Changelog?, String?>
	): EmbedCreateSpec {

		var state = "Closed"
		var color: Color = Color.RED
		if (data.get("state").asText() == "open") {
			state = "Open"
			color = Color.GREEN
		} else if (data.get("merged").asBoolean()) {
			state = "Merged"
			color = Color.of(0x9541A5)
		}

		val changelogBuilder = StringBuilder()
		if (changelog.hasError()) changelogBuilder.append("There was an error compiling changelog: ")
			.append(changelog.error)
		else {
			changelog.value?.entries?.forEach { entry ->
				changelogBuilder.append(":").append(entry.emoji).append(":: ").append(entry.body).append("\n")
			}
			if (changelogBuilder.length > 800) {
				changelogBuilder.setLength(0)
				changelogBuilder.append("Changelog exceeds maximum length")
			}
		}

		val title = data.get("title").asText().replace("<", "")
		return EmbedCreateSpec.builder()
			.author(titleOverride ?: "$state Pull Request", "", "https://i.imgur.com/tpkgmo8.png")
			.description(title)
			.addField("Author", changelog.value?.author ?: data.get("user").get("login").asText(), true)
			.addField("Number", "#${data.get("number").asText()}", true)
			.addField("Github Link", data.get("html_url").asText(), false)
			.addField("Changelog", changelogBuilder.toString(), false)
			.color(color).build()
	}

	private fun getIssueEmbed(jsonData: String?): EmbedCreateSpec {
		if (jsonData == null) return EmbedCreateSpec.create().withTitle("Issue data is null")
		val data: JsonNode = mapper.readTree(jsonData)
		if (data.get("message") != null || data.get("pull_request") != null) return EmbedCreateSpec.create()
			.withTitle("Unable to get issue data")

		var color: Color = Color.RED
		var state = "Closed"
		if (data.get("state").asText() == "open") {
			color = Color.GREEN
			state = "Open"
		}
		val title = data.get("title").asText().replace("<", "")
		return EmbedCreateSpec.builder()
			.author("$state Issue", "", "https://i.imgur.com/tpkgmo8.png")
			.description(title)
			.addField("Author", data.get("user").get("login").asText(), true)
			.addField("Number", "#${data.get("number").asText()}", true)
			.addField("Github Link", data.get("html_url").asText(), false)
			.color(color)
			.build()
	}

	private fun compileChangelog(data: String): YogResult<Changelog?, String?> {

		val body = data.replace("\r\n", "\n").split("\n")
		var username: String? = null

		val changelog: MutableList<ChangelogEntry> = ArrayList()
		var inCLTag = false
		var foundOpeningTag = false
		var foundClosingTag = false

		for (wideLine in body) {
			val line = wideLine.trim()

			if (line.startsWith(":cl:") || line.startsWith("\uD83C\uDD91")) {
				inCLTag = true
				foundOpeningTag = true

				val clAuthors: List<String> = line.split(" ", limit = 2)
				username = if (clAuthors.size < 2) username else clAuthors[2]
				continue
			}

			if (line.startsWith("/:cl:") ||
				line.startsWith("/ :cl:") ||
				line.startsWith("/\uD83C\uDD91") ||
				line.startsWith("/ \uD83C\uDD91") ||
				line.startsWith(":/\uD83C\uDD91")
			) {
				if (!inCLTag) return YogResult.error("Found the end of the changelog before the beginning")
				inCLTag = false
				foundClosingTag = true
				continue
			}

			if (!inCLTag) continue

			val entryData = line.split(" ", limit = 2)
			if (entryData.size < 2 || !entryData[0].endsWith(":")) continue

			val entryType = entryData[0].substring(0, entryData[0].length - 1)
			val entryText = entryData[1]
			changelog.add(
				when (entryType) {
					"fix", "fixes", "bugfix" -> ChangelogEntry("bugfix", "bug", entryText)
					"wip" -> ChangelogEntry("wip", "biohazard", entryText)
					"rsctweak", "tweaks", "tweak" -> ChangelogEntry("tweak", "wrench", entryText)
					"soundadd" -> ChangelogEntry("soundadd", "loud_sound", entryText)
					"sounddel" -> ChangelogEntry("sounddel", "mute", entryText)
					"add", "adds", "rscadd" -> ChangelogEntry("rscadd", "battery", entryText)
					"del", "dels", "rscdel" -> ChangelogEntry("rscdel", "octagonal_sign", entryText)
					"imageadd" -> ChangelogEntry("imageadd", "art", entryText)
					"imagedel" -> ChangelogEntry("imagedel", "scissors", entryText)
					"typo", "spellcheck" -> ChangelogEntry("spellcheck", "pen_ballpoint", entryText)
					"experimental", "experiment" -> ChangelogEntry("experiment", "biohazard", entryText)
					"tgs" -> ChangelogEntry("tgs", "question", entryText)
					else -> return YogResult.error("Unknown tag $entryType")
				}
			)
		}
		if (foundOpeningTag && !foundClosingTag) {
			return YogResult.error("Changelog closing tag was never found")
		}

		if (!foundOpeningTag) {
			return YogResult.error("Changelog not found")
		}

		return YogResult.success(Changelog(username, changelog))

	}

	data class Changelog(val author: String?, val entries: List<ChangelogEntry>)
	data class ChangelogEntry(val type: String, val emoji: String, val body: String)
	data class IssueSubmitDTO(val branch: String, val message: String, val content: String)

	private fun makeRequest(uri: String): WebClient.ResponseSpec {
		val clientRequest = webClient
			.get()
			.uri(URI.create(uri))
			.header("User-Agent", "Yogbot13")
		if (githubConfig.token != "") {
			clientRequest.header("Authorization", "token ${githubConfig.token}")
		}
		return clientRequest.retrieve()
	}
}
