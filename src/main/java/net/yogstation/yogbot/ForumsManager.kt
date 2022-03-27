package net.yogstation.yogbot

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.`object`.entity.Guild
import discord4j.core.`object`.entity.channel.GuildChannel
import discord4j.discordjson.json.MessageData
import discord4j.discordjson.json.MessageEditRequest
import discord4j.discordjson.possible.Possible
import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.ByondLinkUtil
import net.yogstation.yogbot.util.StringUtils
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono
import java.net.URI
import java.util.*
import java.util.regex.Matcher
import java.util.regex.Pattern

@Component
class ForumsManager(
	private val channelsConfig: DiscordChannelsConfig,
	client: GatewayDiscordClient,
	private val discordConfig: DiscordConfig,
	private val webClient: WebClient,
	private val databaseManager: DatabaseManager
) {
	private val banAppealPattern: Pattern =
		Pattern.compile("<item>\\s+<title>(?<title>.+-.+-\\s(?<ping>.+) \\[.+)</title>[\\s\\S]+?<link>(?<link>.+)</link>")
	private val playerComplaintsPattern: Pattern =
		Pattern.compile("<item>\\s+<title>(?<title>.+report by.+)</title>[\\s\\S]+?<link>(?<link>.+)</link>")
	private val adminComplaintsPattern: Pattern =
		Pattern.compile("<item>\\s+<title>(?<title>.+report by.+)</title>[\\s\\S]+?<link>(?<link>.+)</link>")
	private val staffApplicationPattern: Pattern =
		Pattern.compile("<item>\\s+<title>(?<title>.+application)</title>[\\s\\S]+?<link>(?<link>.+)</link>")
	private val mentorApplicationsPattern: Pattern =
		Pattern.compile("<item>\\s+<title>(?<title>.+application)</title>[\\s\\S]+?<link>(?<link>.+)</link>")

	val guild: Guild? = client.getGuildById(Snowflake.of(discordConfig.mainGuildID)).block()

	@Scheduled(fixedRate = 15000)
	fun handleForums() {
		handleChannel(
			channelsConfig.channelBanAppeals,
			"https://forums.yogstation.net/index.php?forums/ban-appeals.2/index.rss",
			banAppealPattern,
			PingType.AUTODETECT
		)
		handleChannel(
			channelsConfig.channelPlayerComplaints,
			"https://forums.yogstation.net/index.php?forums/player-complaints.3/index.rss", playerComplaintsPattern
		)
		handleChannel(
			channelsConfig.channelAdminComplaints,
			"https://forums.yogstation.net/index.php?forums/administrator-complaints.4/index.rss",
			adminComplaintsPattern
		)
		handleChannel(
			channelsConfig.channelStaffApplications,
			"https://forums.yogstation.net/index.php?forums/administrator-applications.6/index.rss",
			staffApplicationPattern
		)
		handleChannel(
			channelsConfig.channelMentorApplications,
			"https://forums.yogstation.net/index.php?forums/mentor-applications.206/index.rss",
			mentorApplicationsPattern,
			PingType.MENTOR_STAFF
		)
	}

	private fun getPing(pingType: PingType, mention: String): Mono<String> {
		if (pingType == PingType.AUTODETECT && guild != null) {
			val ckey = StringUtils.ckeyIze(mention)
			val response = ByondLinkUtil.getMemberID(ckey, databaseManager)
			if(response.value != null) {
				return guild.getMemberById(response.value).map {
					if(it.roleIds.contains(Snowflake.of(discordConfig.staffRole))) {
						it.mention
					} else getDefaultPing(pingType)
				}
			}
		}
		return Mono.just(getDefaultPing(pingType))
	}

	private fun getDefaultPing(pingType: PingType): String {
		return when(pingType) {
			PingType.AUTODETECT, PingType.STAFF_ONLY -> "<@&${discordConfig.staffRole}>"
			PingType.MENTOR_STAFF -> "<@&${discordConfig.mentorRole}> <@&${discordConfig.staffRole}>"
		}
	}

	private fun handleChannel(channelId: Long, url: String, regex: Pattern, pingType: PingType = PingType.STAFF_ONLY) {
		guild?.getChannelById(Snowflake.of(channelId))?.flatMap { channel ->
			fetchData(url).flatMap { response ->
				val matcher: Matcher = regex.matcher(response)

				channel.restChannel.getMessagesAfter(Snowflake.of(0)).collectList().flatMap { unprocessedMessages ->
					var publishResult: Mono<*> = Mono.empty<Any>()
					while (matcher.find()) {
						publishResult = publishResult.and(processPost(
							pingType,
							unprocessedMessages,
							channel,
							matcher.group("link"),
							matcher.group("title"),
							if (pingType == PingType.AUTODETECT) matcher.group("ping") else ""
						))
					}

					for(toDelete in unprocessedMessages) {
						publishResult = publishResult.and(channel.restChannel.getRestMessage(Snowflake.of(toDelete.id())).delete("Post Removed"))
					}

					publishResult
				}
			}
		}?.subscribe()

	}

	private fun processPost(
		pingType: PingType,
		unprocessedMessages: MutableList<MessageData>,
		channel: GuildChannel,
		link: String,
		title: String,
		ping: String,
	): Mono<*> {
		for (message in unprocessedMessages) {
			if (message.content().contains(link)) {
				unprocessedMessages.remove(message)
				return getMessageContent(pingType, title, link, ping).flatMap {
					if (message.content() != it) {
						channel.restChannel.getRestMessage(Snowflake.of(message.id())).edit(
							MessageEditRequest.builder().content(Possible.of(Optional.of(it))).build()
						)
					} else Mono.empty<Any>()
				}
			}
		}
		return getMessageContent(pingType, title, link, ping).flatMap { channel.restChannel.createMessage(it) }
	}

	private fun getMessageContent(pingType: PingType, title: String, link: String, ping: String): Mono<String> {
		return getPing(pingType, ping).map { "$it `$title`\n        <$link>" }
	}

	private fun fetchData(url: String): Mono<String> {
		return webClient.get()
			.uri(URI.create(url))
			.retrieve()
			.bodyToMono(String::class.java)
	}

	enum class PingType {
		STAFF_ONLY, MENTOR_STAFF, AUTODETECT
	}

}
