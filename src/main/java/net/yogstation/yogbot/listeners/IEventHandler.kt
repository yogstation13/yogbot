package net.yogstation.yogbot.listeners

import discord4j.core.event.domain.Event
import reactor.core.publisher.Mono

interface IEventHandler<T : Event> {
	/**
	 * Gets the name of the interaction as sent by discord
	 *
	 * @return the name
	 */
	val name: String

	/**
	 * This is the method that is actually called when the interaction actually triggers
	 *
	 * @param event The inciting event
	 * @return The Mono with reply information
	 */
	fun handle(event: T): Mono<*>
}
