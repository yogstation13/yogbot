package net.yogstation.yogbot.listeners.commands

import discord4j.core.`object`.entity.Member
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.util.DiscordUtil
import reactor.core.publisher.Mono

abstract class PermissionsCommand(discordConfig: DiscordConfig, protected val permissions: PermissionsManager) :
	TextCommand(
		discordConfig
	) {
	protected abstract val requiredPermissions: String?
	override fun canFire(event: MessageCreateEvent): Boolean {
		return hasPermission(event.member.orElse(null))
	}

	override fun doError(event: MessageCreateEvent): Mono<*> {
		return DiscordUtil.reply(event, "You do not have permission to use this command")
	}

	fun hasPermission(member: Member?): Boolean {
		return permissions.hasPermission(member, requiredPermissions)
	}
}
