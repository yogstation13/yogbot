package net.yogstation.yogbot.listeners

import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.interaction.ModalSubmitInteractionEvent
import net.yogstation.yogbot.listeners.interactions.IModalSubmitHandler
import org.springframework.stereotype.Component
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Component
class ModalSubmitListener(private val commands: List<IModalSubmitHandler>, client: GatewayDiscordClient) {
	init {
		client.on(ModalSubmitInteractionEvent::class.java) { event: ModalSubmitInteractionEvent -> handle(event) }
			.subscribe()
	}

	fun handle(event: ModalSubmitInteractionEvent): Mono<*> {
		return Flux.fromIterable(commands)
			.filter { command: IModalSubmitHandler ->
				event.customId.startsWith(
					command.idPrefix!!
				)
			}
			.next()
			.flatMap { command: IModalSubmitHandler -> command.handle(event) }
	}
}
