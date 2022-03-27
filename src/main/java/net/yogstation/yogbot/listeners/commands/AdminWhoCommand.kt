package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.ByondConnector
import net.yogstation.yogbot.config.DiscordChannelsConfig
import discord4j.core.event.domain.message.MessageCreateEvent
import reactor.core.publisher.Mono
import discord4j.common.util.Snowflake
import net.yogstation.yogbot.util.DiscordUtil

class AdminWhoCommand(
	discordConfig: DiscordConfig, private val byondConnector: ByondConnector,
	private val channelsConfig: DiscordChannelsConfig
) : TextCommand(discordConfig) {
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		return DiscordUtil.reply(event, getAdmins(event.message.channelId, byondConnector, channelsConfig))
	}

	override val name = "adminwho"
	override val description = "Get current admins online."

	companion object {
		fun getAdmins(
			channelID: Snowflake,
			byondConnector: ByondConnector,
			channelsConfig: DiscordChannelsConfig
		): String {
			var byondMessage = "?adminwho"
			if (channelsConfig.isAdminChannel(channelID.asLong())) byondMessage += "&adminchannel=1"
			val result = byondConnector.request(byondMessage)
			var admins = (if (result.hasError()) result.error else result.value) as String
			admins = admins.replace("\u0000".toRegex(), "")
			return admins
		}
	}
}
