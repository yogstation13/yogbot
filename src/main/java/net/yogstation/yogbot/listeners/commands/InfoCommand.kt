package net.yogstation.yogbot.listeners.commands

import discord4j.core.event.domain.message.MessageCreateEvent
import discord4j.core.spec.EmbedCreateSpec
import discord4j.rest.util.Color
import net.yogstation.yogbot.ByondConnector
import net.yogstation.yogbot.config.ByondConfig
import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.DiscordUtil
import net.yogstation.yogbot.util.StringUtils
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class InfoCommand(
	discordConfig: DiscordConfig, private val byondConnector: ByondConnector, private val byondConfig: ByondConfig,
	private val channelsConfig: DiscordChannelsConfig
) : TextCommand(discordConfig) {
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		var admins = AdminWhoCommand.getAdmins(event.message.channelId, byondConnector, channelsConfig)
		admins = admins.replace("\t".toRegex(), "")

		val pingResponse = byondConnector.request("?ping")
		if (pingResponse.hasError()) return DiscordUtil.reply(event, pingResponse.error ?: "Unknown Error")
		val playerCount: Int = (pingResponse.value as Float).toInt()

		val statusResponse = byondConnector.request("?status")
		if (statusResponse.hasError()) return DiscordUtil.reply(event, statusResponse.error ?: "Unknown Error")
		var statusString = statusResponse.value as String
		statusString = statusString.replace("\u0000".toRegex(), "")

		val statusValues = StringUtils.splitQuery(statusString)
		val roundDuration = statusValues.getOrDefault("round_duration", listOf("0"))[0].toInt() / 60
		val shuttleMode = statusValues.getOrDefault("shuttle_mode", listOf("idle"))[0]
		val shuttleModeDisplay = when (shuttleMode) {
			"igniting", "docked" -> "Docked"
			"recall" -> "Recalled"
			"call", "landing" -> "Called"
			"stranded" -> "Disabled"
			"escape" -> "Departed"
			"endgame: game over" -> "Round Over"
			"recharging" -> "Charging"
			else -> "Idle"
		}
		val shuttleTimer = statusValues.getOrDefault("shuttle_timer", listOf("0"))[0]
		val shuttleTime = shuttleTimer.toInt() / 60
		var roundId = statusValues.getOrDefault("round_id", listOf("Unknown"))[0]
		if (roundId == "") roundId = "Unknown"
		val securityLevel = statusValues.getOrDefault("security_level", listOf("Unknown"))[0]
		val embedColor = Color.of(
			when (securityLevel) {
				"green" -> 0x12A125
				"blue" -> 0x1242A1
				"red" -> 0xA11212
				"gamma" -> 0xD6690A
				"epsilon" -> 0x617444
				"delta" -> 0x2E0340
				else -> 0x000000
			}
		)

		val embedBuilder = EmbedCreateSpec.builder()
			.color(embedColor)
			.author("Information", byondConfig.serverJoinAddress, "https://i.imgur.com/GPZgtbe.png")
			.description(String.format("Join the server now at %s", byondConfig.serverJoinAddress))
			.addField("Players online:", playerCount.toString(), true)
			.addField("Current round:", roundId, true)
			.addField("Round duration:", "$roundDuration minutes", true)
			.addField("Shuttle status:", shuttleModeDisplay, true)
		if (timerModes.contains(shuttleMode)) embedBuilder.addField(
			"Shuttle timer:",
			String.format("%d minutes", shuttleTime),
			true
		)
		embedBuilder.addField("Security level:", securityLevel, true)
		if (admins.trim { it <= ' ' }.isNotEmpty()) {
			embedBuilder.addField("Admins online:", admins, false)
		}
		return DiscordUtil.reply(event, embedBuilder.build())
	}

	override val description = "Pings the server and names the admins"
	override val name = "info"

	companion object {
		private val timerModes = setOf("call", "recall", "igniting", "docked", "escape", "landing")
	}
}
