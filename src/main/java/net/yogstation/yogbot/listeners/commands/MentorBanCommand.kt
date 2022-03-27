package net.yogstation.yogbot.listeners.commands

import discord4j.common.util.Snowflake
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import org.springframework.stereotype.Component

@Component
class MentorBanCommand(discordConfig: DiscordConfig, permissions: PermissionsManager) : ChannelBanCommand(
	discordConfig, permissions
) {
	override val banRole: Snowflake = Snowflake.of(discordConfig.mentorBanRole)
	override val requiredPermissions = "mentorban"
	override val description = "Ban someone from the mentor channel"
	override val name = "mentorban"
}
