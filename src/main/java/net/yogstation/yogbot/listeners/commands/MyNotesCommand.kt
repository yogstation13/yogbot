package net.yogstation.yogbot.listeners.commands

import discord4j.core.`object`.entity.channel.PrivateChannel
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.DatabaseManager
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import net.yogstation.yogbot.util.ByondLinkUtil
import net.yogstation.yogbot.util.DiscordUtil
import net.yogstation.yogbot.util.MonoCollector
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class MyNotesCommand(discordConfig: DiscordConfig, permissions: PermissionsManager, database: DatabaseManager) :
	GetNotesCommand(
		discordConfig, permissions, database
	) {
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val author = event.message.author
		if (author.isEmpty) return Mono.empty<Any>()
		val ckeyResult = ByondLinkUtil.getCkey(author.get().id, database)
		return if (ckeyResult.hasError()) DiscordUtil.reply(event, ckeyResult.error!!)
		else author.get()
			.privateChannel
			.flatMap { privateChannel: PrivateChannel ->
				getNotes(ckeyResult.value!!, false).stream()
					.map { message: String? ->
						privateChannel.createMessage(
							message
						)
					}
					.collect(MonoCollector.toMono())
			}
	}

	override val description = "Checks your notes"
	override val name = "mynotes"
	override val requiredPermissions: String? = null
}
