package net.yogstation.yogbot.listeners.commands

import discord4j.common.util.Snowflake
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import org.springframework.stereotype.Component

@Component
class WikibanCommand(discordConfig: DiscordConfig, permissions: PermissionsManager) : ChannelBanCommand(
	discordConfig, permissions
) {
	override val banRole: Snowflake = Snowflake.of(discordConfig.wikibanRole)
	override val requiredPermissions = "wikiban"
	override val description = "Ban someone from the wiki channel."
	override val name = "wikiban"
}
