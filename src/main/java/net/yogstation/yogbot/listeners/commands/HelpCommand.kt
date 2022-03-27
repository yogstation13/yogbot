package net.yogstation.yogbot.listeners.commands

import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class HelpCommand(val commands: List<TextCommand>, discordConfig: DiscordConfig) : TextCommand(discordConfig) {
	override val name = "help"

	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val member = event.member.orElse(null)
		val hidden = event.message.content.contains("hidden")

		val output = StringBuilder("Available Commands:\n")
		commands.filter { textCommand -> textCommand.isHidden == hidden }
			.filter { textCommand -> textCommand !is PermissionsCommand || textCommand.hasPermission(member) }
			.map(TextCommand::helpText)
			.forEach { helpText ->
				output.append(helpText)
				output.append("\n")
			}
		return DiscordUtil.reply(event, output.toString())
	}

	override val description = """
	Displays a list of commands you have access to
	    `${discordConfig.commandPrefix}${name} hidden` - Displays hidden commands"
	""".trimIndent()
}

