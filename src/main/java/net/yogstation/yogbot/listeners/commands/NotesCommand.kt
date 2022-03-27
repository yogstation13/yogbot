package net.yogstation.yogbot.listeners.commands

import discord4j.core.`object`.entity.channel.MessageChannel
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.DatabaseManager
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import net.yogstation.yogbot.util.MonoCollector
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class NotesCommand(discordConfig: DiscordConfig, permissions: PermissionsManager, database: DatabaseManager) :
	GetNotesCommand(
		discordConfig, permissions, database
	) {
	override val requiredPermissions = "note"

	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val target = getTarget(event)
		var notes = listOf("An unknown error has occurred")
		if (target == null) notes = listOf(
			"Usage is `${discordConfig.commandPrefix}notes <ckey or @Username>`"
		) else {
			val targetCkey = target.ckey
			if (targetCkey == null) {
				val populateResult = target.populate(database)
				if (populateResult != null) notes = listOf(populateResult)
			} else
				notes = getNotes(targetCkey, true)
		}
		val finalNotes = notes
		return event.message
			.channel
			.flatMap { messageChannel: MessageChannel ->
				finalNotes.stream()
					.map { message ->
						messageChannel.createMessage(
							message
						)
					}
					.collect(MonoCollector.toMono())
			}
	}

	override val description = "Check a user's notes"
	override val name = "notes"
}
