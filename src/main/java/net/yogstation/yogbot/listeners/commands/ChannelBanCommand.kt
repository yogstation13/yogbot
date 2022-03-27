package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import discord4j.common.util.Snowflake
import discord4j.core.`object`.entity.PartialMember
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.util.DiscordUtil
import reactor.core.publisher.Mono

abstract class ChannelBanCommand(discordConfig: DiscordConfig, permissions: PermissionsManager) : PermissionsCommand(
	discordConfig, permissions
) {
	protected abstract val banRole: Snowflake
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		if (event.message.memberMentions.size != 1) return DiscordUtil.reply(
			event,
			"Usage is `${discordConfig.commandPrefix}$name [@UserName]`"
		)
		val partialMember: PartialMember = event.message.memberMentions[0]
		return if (partialMember.roleIds.contains(banRole)) partialMember.removeRole(
			banRole, String.format(
				"Ban lifted by %s",
				if (event.message
						.author
						.isPresent
				) event.message
					.author
					.get()
					.username else "unknown"
			)
		)
			.and(DiscordUtil.reply(event, "Ban lifted successfully")) else partialMember.addRole(
			banRole, String.format(
				"Ban applied by %s",
				if (event.message.author.isPresent) event.message.author.get().username else "unknown"
			)
		)
			.and(DiscordUtil.reply(event, "Ban applied successfully"))
	}
}
