package net.yogstation.yogbot.listeners

import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.guild.BanEvent
import net.yogstation.yogbot.util.LogChannel
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class BanListener(val client: GatewayDiscordClient, private val logChannel: LogChannel) {

	init {
		client.on(BanEvent::class.java) { this.handle(it) }.subscribe()
	}

	fun handle(event: BanEvent): Mono<*> {
		return logChannel.log("**${event.user.username}#${event.user.discriminator}** was banned from the server")
	}
}
