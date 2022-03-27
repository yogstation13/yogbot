package net.yogstation.yogbot.listeners.commands

import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.ByondConnector
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

@Component
class UnlinkCommand(discordConfig: DiscordConfig, private val byondConnector: ByondConnector) : TextCommand(
	discordConfig
) {
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val args = event.message.content.split(" ").toTypedArray()
		if (args.size < 2) return DiscordUtil.reply(event, "Usage: `${args[0]} <ckey>`")
		val requestResult =
			byondConnector.request(String.format("?unlink=%s", URLEncoder.encode(args[1], StandardCharsets.UTF_8)))
		val message: String = if (requestResult.hasError()) requestResult.error ?: "Unknown Error" else (requestResult.value as String).replace(
			"\u0000".toRegex(),
			""
		)
		return DiscordUtil.reply(event, message)
	}

	override val description = "Unlinks a ckey from a discord ID"
	override val name = "unlink"
}
