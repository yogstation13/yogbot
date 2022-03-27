package net.yogstation.yogbot.listeners

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.guild.BanEvent
import discord4j.core.event.domain.guild.UnbanEvent
import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.util.DiscordUtil
import net.yogstation.yogbot.util.LogChannel
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class UnbanListener(val client: GatewayDiscordClient, private val logChannel: LogChannel) {

	init {
		client.on(UnbanEvent::class.java) { this.handle(it) }.subscribe()
	}

	fun handle(event: UnbanEvent): Mono<*> {
		return logChannel.log("**${event.user.username}#${event.user.discriminator}** was un from the server")
	}
}
