package net.yogstation.yogbot.listeners.interactions

import discord4j.common.util.Snowflake
import discord4j.core.`object`.component.ActionRow
import discord4j.core.`object`.component.MessageComponent
import discord4j.core.`object`.component.TextInput
import discord4j.core.`object`.entity.Member
import discord4j.core.`object`.entity.User
import discord4j.core.event.domain.interaction.ModalSubmitInteractionEvent
import discord4j.core.event.domain.interaction.UserInteractionEvent
import net.yogstation.yogbot.permissions.PermissionsManager
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class KickCommand(private val permissions: PermissionsManager) : IUserCommand, IModalSubmitHandler {
	override val name = "Kick"

	override fun handle(event: UserInteractionEvent): Mono<*> {
		if (event.interaction.guildId.isEmpty) return event.reply().withEphemeral(true)
			.withContent("Must be used in a guild")
		if (!permissions.hasPermission(event.interaction.member.orElse(null), "kick")) return event.reply()
			.withEphemeral(true).withContent("You do not have permission to run that command")

		return if (event.targetId == event.interaction.user.id) event.reply().withEphemeral(true)
			.withContent("You cannot kick yourself") else event.targetUser
			.flatMap { user: User ->
				user.asMember(event.interaction.guildId.get()).flatMap { member: Member? ->
						if (permissions.hasPermission(member, "kick")) event.reply().withEphemeral(true)
							.withContent("Cannot kick staff")
						else event.presentModal()
							.withCustomId(String.format("%s-%s", idPrefix, event.targetId.asString()))
							.withTitle("Kick Menu")
							.withComponents(ActionRow.of(
								TextInput.paragraph("reason", "Kick Reason"))
							)
					}
			}
	}

	override val idPrefix = "kick"

	override fun handle(event: ModalSubmitInteractionEvent): Mono<*> {
		val toBan: Snowflake = Snowflake.of(event.customId.split("-").toTypedArray()[1])
		var reason = ""
		for (component in event.components) {
			if (component.type == MessageComponent.Type.ACTION_ROW) {
				if (component.data.components().isAbsent) continue
				for (data in component.data.components().get()) {
					if (data.customId().isAbsent) continue
					if ("reason" == data.customId().get()) {
						if (data.value().isAbsent) return event.reply().withContent("Please specify a kick reason")
						reason = data.value().get()
					}
				}
			}
		}
		val finalReason = reason
		return event.interaction
			.guild
			.flatMap { guild -> guild.getMemberById(toBan) }
			.flatMap { member: Member ->
				member.kick(
					String.format(
						"Kicked by %s for %s",
						event.interaction.user.username,
						finalReason
					)
				)
			}
	}
}
