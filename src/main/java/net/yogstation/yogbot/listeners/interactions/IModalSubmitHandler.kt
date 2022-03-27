package net.yogstation.yogbot.listeners.interactions

import discord4j.core.event.domain.interaction.ModalSubmitInteractionEvent
import reactor.core.publisher.Mono

interface IModalSubmitHandler {
	val idPrefix: String?
	fun handle(event: ModalSubmitInteractionEvent): Mono<*>
}
