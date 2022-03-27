package net.yogstation.yogbot.listeners

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.DiscordUtil
import net.yogstation.yogbot.http.GithubController
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.util.regex.Matcher
import java.util.regex.Pattern

@Component
class MessageListener(client: GatewayDiscordClient, val discordConfig: DiscordConfig, val githubController: GithubController) {
	private val prPattern: Pattern = Pattern.compile("\\[#([0-9]+)]")

	init {
		client.on(MessageCreateEvent::class.java) { event: MessageCreateEvent -> handle(event) }.subscribe()
	}

	fun handle(event: MessageCreateEvent): Mono<*> {
		var responses: Mono<*> = Mono.empty<Any>()

		val content: String = event.message.content
		if(event.message.author.isEmpty) return responses

		if (content.contains("snail") && content.contains("when"))
			responses = responses.and(DiscordUtil.reply(event, "When you code it"))

		val jesterRole = Snowflake.of(discordConfig.jesterRole)
		if (event.message.roleMentionIds.contains(jesterRole)) {
			responses = responses.and(event.message.authorAsMember
				.filter { member -> !member.roleIds.contains(jesterRole) }
				.flatMap { member -> member.addRole(jesterRole) }
				.and(DiscordUtil.reply(event, "It appears you have, for the first time, engaged in the dastardly action to ping Jester! For this crime you have been assigned the role of Jester. Congratulations on your promotion!")))
		}

		val prMatcher: Matcher = prPattern.matcher(content)
		if (prMatcher.matches()) {
			responses = responses.and(event.message.channel.flatMap { channel -> githubController.postPR(channel, prMatcher.group(1)) })
		}

		return responses
	}
}
