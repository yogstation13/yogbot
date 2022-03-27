package net.yogstation.yogbot.listeners.commands

import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class MyIDCommand(discordConfig: DiscordConfig) : TextCommand(discordConfig) {
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		return if (event.message.author.isEmpty) Mono.empty<Any>() else DiscordUtil.reply(
			event,
			"Your ID is ${event.message.author.get().id.asString()}"
		)
	}

	override val description = "Provides your Discord ID, no longer used for account linking"
	override val name = "myid"
}
