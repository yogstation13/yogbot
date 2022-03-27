package net.yogstation.yogbot.listeners.channel

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.ObjectMapper
import discord4j.common.util.Snowflake
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.config.GithubConfig
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.WebClientRequestException
import reactor.core.publisher.Mono
import java.net.URI

@Component
class BugReportChannel(
	channelsConfig: DiscordChannelsConfig,
	private val webClient: WebClient,
	private val githubConfig: GithubConfig
) : AbstractChannel(channelsConfig) {
	override val channel: Snowflake = Snowflake.of(channelsConfig.channelBugReports)

	override fun handle(event: MessageCreateEvent): Mono<*> {
		if (event.message.content.startsWith("-")) return Mono.empty<Any>()
		val lines = event.message.content.split("\n")

		var title = ""
		var roundId = ""
		var testmerges = "Not Supplied / None"

		val bodyBuilder = StringBuilder()
		for (line in lines) {
			val parts = line.split(":", limit = 2)
			when (parts[0].lowercase()) {
				"round id" -> roundId = parts[1]
				"testmerges" -> testmerges = parts[1]
				"title" -> title = parts[1]
				else -> bodyBuilder.append(line).append("\n")
			}
		}

		if (bodyBuilder.isEmpty() || title == "") {
			val missingThing: String = if (bodyBuilder.isEmpty() && title == "")
				"title and no body"
			else if (bodyBuilder.isEmpty())
				"body"
			else
				"title"
			return DiscordUtil.reply(
				event,
				"No $missingThing detected in message. Did you fill it out properly? (Check the pins for the template)"
			)
		}

		if (roundId == "") {
			return DiscordUtil.reply(event, "No round ID detected. Either supply one or input N/A")
		}

		val suppliedImages = StringBuilder()
		for (attachment in event.message.attachments) {
			suppliedImages.append("\n![SuppliedImage](${attachment.url})")
		}

		val formattedBody = StringBuilder("## Round ID: $roundId\n\n")
		formattedBody.append("## Test Merges: \n$testmerges\n")
		formattedBody.append("## Reproduction:\n$bodyBuilder")

		if (suppliedImages.isNotEmpty()) {
			formattedBody.append("## Supplied Image:\n$suppliedImages")
		}

		formattedBody.append("\n Submitted by: ${event.message.author.get().username} (${event.message.author.get().id.asString()})")

		val requestData = IssueSubmitDTO(title, formattedBody.toString())

		return webClient.post()
			.uri(URI.create("${githubConfig.repoLink}/issues"))
			.header("Authorization", "token ${githubConfig.token}")
			.header("User-Agent", "Yogbot13")
			.contentType(MediaType.APPLICATION_JSON)
			.bodyValue(requestData)
			.retrieve()
			.onStatus({ it.isError }, { response ->
				response.bodyToMono(String::class.java).flatMap { body ->
					DiscordUtil.reply(event, "Error: ${response.statusCode()}/$body")
						.then(Mono.error(Exception("Error: ${response.statusCode()}/$body")))
				}
			})
			.bodyToMono(IssueResponseDTO::class.java)
			.flatMap { DiscordUtil.reply(event, "Issue submitted.\n Link: <${it.html_url}>") }


	}
	class IssueSubmitDTO (
		val title: String,
		val body: String
	)

	@JsonIgnoreProperties(ignoreUnknown = true)
	class IssueResponseDTO (
		@JsonProperty("html_url") val html_url: String
		)
}
