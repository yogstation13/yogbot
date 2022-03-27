package net.yogstation.yogbot.listeners.commands

import discord4j.common.util.Snowflake
import discord4j.core.`object`.entity.PartialMember
import discord4j.core.`object`.entity.User
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.util.*

@Component
class UserverifyCommand(discordConfig: DiscordConfig, permissions: PermissionsManager) : PermissionsCommand(
	discordConfig, permissions
) {
	override val requiredPermissions = "userverify"

	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val mentions: List<PartialMember> = event.message.memberMentions
		if (mentions.isEmpty()) return DiscordUtil.reply(
			event,
			"Usage: `${discordConfig.commandPrefix}userverify <@Username>`"
		)
		val target: PartialMember = mentions[0]
		val author: Optional<User> = event.message.author
		if (author.isEmpty) return Mono.empty<Any>()
		val user: String = author.get().username
		val verifyRole: Snowflake = Snowflake.of(discordConfig.manualVerifyRole)
		return if (target.roleIds.contains(verifyRole)) target.removeRole(
			verifyRole,
			"Manually unverified by $user"
		)
			.and(DiscordUtil.reply(event, "User unverified")) else target.addRole(
			verifyRole,
			"Manually verified by $user"
		)
			.and(DiscordUtil.reply(event, "User verified"))
	}

	override val description = "Verifies someone on the discord. Use again to un-verify someone."
	override val name = "userverify"
}
