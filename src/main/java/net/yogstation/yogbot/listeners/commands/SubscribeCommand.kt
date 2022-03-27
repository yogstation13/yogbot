package net.yogstation.yogbot.listeners.commands

import discord4j.common.util.Snowflake
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class SubscribeCommand(discordConfig: DiscordConfig) : TextCommand(discordConfig) {
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		return if (event.member.isEmpty) Mono.empty<Any>() else event.member
			.get()
			.addRole(Snowflake.of(discordConfig.subscriberRole))
			.and(DiscordUtil.reply(event, "You are now a subscriber"))
	}

	override val description = "subscribe to the roundstart announcements"
	override val name = "subscribe"
}
