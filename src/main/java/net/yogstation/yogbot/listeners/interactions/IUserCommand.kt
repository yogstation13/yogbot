package net.yogstation.yogbot.listeners.interactions

import discord4j.core.event.domain.interaction.UserInteractionEvent
import net.yogstation.yogbot.listeners.IEventHandler

interface IUserCommand : IInteractionHandler, IEventHandler<UserInteractionEvent> {
	override val uri: String
		get() = "${name.lowercase()}.json"
}
