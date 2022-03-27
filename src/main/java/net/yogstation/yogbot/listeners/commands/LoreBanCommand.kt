package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import net.yogstation.yogbot.listeners.commands.ChannelBanCommand
import discord4j.common.util.Snowflake
import org.springframework.stereotype.Component

@Component
class LoreBanCommand(discordConfig: DiscordConfig, permissions: PermissionsManager) :
	ChannelBanCommand(discordConfig, permissions) {
	override val banRole: Snowflake = Snowflake.of(discordConfig.loreBanRole)
	override val requiredPermissions = "loreban"
	override val description = "Ban someone from the lore channel"
	override val name = "loreban"
}
