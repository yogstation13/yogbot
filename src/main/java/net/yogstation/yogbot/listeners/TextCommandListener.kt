package net.yogstation.yogbot.listeners

import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.listeners.commands.TextCommand
import org.springframework.stereotype.Component
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Component
class TextCommandListener(
	private val commands: List<TextCommand>,
	client: GatewayDiscordClient,
	private val config: DiscordConfig
) {
	init {
		client.on(MessageCreateEvent::class.java) { event: MessageCreateEvent -> handle(event) }.subscribe()
	}

	fun handle(event: MessageCreateEvent): Mono<*> {
		return Flux.fromIterable(commands)
			.filter { command: TextCommand ->
				event.message.content.startsWith(
					config.commandPrefix + command.name
				)
			}
			.next()
			.flatMap { command: TextCommand -> command.handle(event) }
	}
}
