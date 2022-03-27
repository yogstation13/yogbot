package net.yogstation.yogbot.util

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import net.yogstation.yogbot.config.DiscordChannelsConfig
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Component
class LogChannel(val client: GatewayDiscordClient, val channelsConfig: DiscordChannelsConfig) {
	fun log(
		message: String
	): Mono<*> {
		val currentTime = LocalDateTime.now()
		return client.getChannelById(Snowflake.of(channelsConfig.channelPublicLog))
			.flatMap { it.restChannel.createMessage("`[${currentTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)}]` $message") }
	}
}
