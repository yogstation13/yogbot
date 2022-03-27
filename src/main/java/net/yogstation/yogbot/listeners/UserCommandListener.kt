package net.yogstation.yogbot.listeners

import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.interaction.UserInteractionEvent
import net.yogstation.yogbot.listeners.interactions.IUserCommand
import org.springframework.stereotype.Component
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Component
class UserCommandListener(private val commands: List<IUserCommand>, client: GatewayDiscordClient) {
	init {
		client.on(UserInteractionEvent::class.java) { event: UserInteractionEvent -> handle(event) }.subscribe()
	}

	fun handle(event: UserInteractionEvent): Mono<*> {
		return Flux.fromIterable(commands)
			.filter { command: IUserCommand -> command.name == event.commandName }
			.next()
			.flatMap { command: IUserCommand -> command.handle(event) }
	}
}
