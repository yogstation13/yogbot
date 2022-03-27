package net.yogstation.yogbot.listeners

import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.listeners.channel.AbstractChannel
import org.springframework.stereotype.Component
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Component
class ChannelListener(private val channelMessageHandlers: List<AbstractChannel>, client: GatewayDiscordClient) {
	init {
		client.on(MessageCreateEvent::class.java) { event: MessageCreateEvent -> handle(event) }.subscribe()
	}

	fun handle(event: MessageCreateEvent): Mono<*> {
		if(event.message.author.isEmpty || event.message.author.get().isBot) return Mono.empty<Any>()
		return Flux.fromIterable(channelMessageHandlers)
			.filter { channelMessageHandler: AbstractChannel -> event.message.channelId == channelMessageHandler.channel }
			.next()
			.flatMap { command: AbstractChannel -> command.handle(event) }
	}
}
