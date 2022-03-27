package net.yogstation.yogbot.listeners.commands

import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.ByondConnector
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.net.URLEncoder
import java.nio.charset.StandardCharsets
import java.util.regex.Pattern

@Component
class MHelpCommand(
	discordConfig: DiscordConfig,
	permissions: PermissionsManager,
	private val byondConnector: ByondConnector
) : PermissionsCommand(
	discordConfig, permissions
) {
	override val requiredPermissions = "mhelp"
	override val description = "Replay to a mentor help."
	override val name = "mhelp"
	private val argsPattern = Pattern.compile(".\\w+\\s(\\w+)\\s(.+)")

	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val matcher = argsPattern.matcher(event.message.content)
		if (!matcher.matches()) return DiscordUtil.reply(event, "Usage is `${discordConfig.commandPrefix}mhelp <ckey> <message>")
		val builder = StringBuilder("?mhelp=1")
		builder.append("&msg=").append(URLEncoder.encode(matcher.group(2), StandardCharsets.UTF_8))
		builder.append("&admin=")
		val author = event.message.author.orElse(null)
		if (author != null) {
			builder.append(
				URLEncoder.encode(
					String.format("@%s#%s", author.username, author.discriminator),
					StandardCharsets.UTF_8
				)
			)
			builder.append("&admin_id=").append(author.id.asLong())
		} else {
			builder.append("Mentor")
			builder.append("&admin_id=").append("0")
		}
		builder.append("&whom=").append(URLEncoder.encode(matcher.group(1), StandardCharsets.UTF_8))
		val result = byondConnector.request(builder.toString())
		if (result.hasError()) return DiscordUtil.reply(event, result.error ?: "Unknown Error")
		return if (result.value as Float == 0f) {
			DiscordUtil.reply(event, "Error: Mentor-PM: Client ${matcher.group(1)} not found.")
		} else Mono.empty<Any>()
	}
}
