package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.util.*

@Component
class EightBallCommand(discordConfig: DiscordConfig, private val random: Random) : TextCommand(
	discordConfig
) {
	override val name = "8ball"

	public override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val responses = arrayOf(
			"It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.",
			"You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.",
			"Signs point to yes.", "Reply hazy, try again.", "Ask again later.",
			"Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
			"Don't count on it.", "My reply is no.", "My sources say no.",
			"Outlook not so good.", "Very doubtful."
		)
		return DiscordUtil.reply(event, responses[random.nextInt(responses.size)])
	}

	override val description = "Gaze into the future."
	override val isHidden = true
}
