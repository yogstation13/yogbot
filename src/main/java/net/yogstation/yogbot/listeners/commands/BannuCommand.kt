package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.util.DiscordUtil
import reactor.core.publisher.Mono
import org.springframework.stereotype.Component
import java.util.regex.Pattern

@Component
class BannuCommand(discordConfig: DiscordConfig) :
	TextCommand(discordConfig) {

	private val argsPattern = Pattern.compile(".\\w+\\s(<@!?\\d+>)\\s?(.*)")
	override val name = "bannu"
	override val description = "\"\"\"\"\"Ban\"\"\"\"\" a user"
	override val isHidden = true

	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val matcher = argsPattern.matcher(event.message.content)
		if (!matcher.matches()) {
			return DiscordUtil.reply(event, "Usage is `${discordConfig.commandPrefix}bannu [@UserName] <reason>`")
		}
		val who = matcher.group(1)
		var reason = matcher.group(2)
		reason = if (reason == "") {
			"NO RAISIN"
		} else {
			"\"\"\"\"\"${reason.uppercase()}\"\"\"\"\""
		}
		return DiscordUtil.reply(event, "$who HAS BEEN BANED 4 $reason")
	}
}
