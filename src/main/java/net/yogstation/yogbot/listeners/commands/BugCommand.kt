package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class BugCommand(discordConfig: DiscordConfig) : TextCommand(discordConfig) {
	override val name = "bug"
	override val description = "Get off my lawn"
	override val isHidden = true

	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		return DiscordUtil.send(event, "https://i.imgur.com/iO03Tqm.gifv")
	}
}
