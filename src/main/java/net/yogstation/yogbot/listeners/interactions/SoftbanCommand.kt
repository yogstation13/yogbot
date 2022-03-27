package net.yogstation.yogbot.listeners.interactions

import discord4j.common.util.Snowflake
import discord4j.core.`object`.component.ActionRow
import discord4j.core.`object`.component.MessageComponent
import discord4j.core.`object`.component.TextInput
import discord4j.core.`object`.entity.Guild
import discord4j.core.`object`.entity.Member
import discord4j.core.event.domain.interaction.ModalSubmitInteractionEvent
import discord4j.core.event.domain.interaction.UserInteractionEvent
import net.yogstation.yogbot.bans.BanManager
import net.yogstation.yogbot.permissions.PermissionsManager
import net.yogstation.yogbot.util.YogResult
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class SoftbanCommand(private val permissions: PermissionsManager, private val banManager: BanManager) : IUserCommand,
	IModalSubmitHandler {

	override val name: String
		get() = "Softban"

	override fun handle(event: UserInteractionEvent): Mono<*> {
		return if (!permissions.hasPermission(event.interaction.member.orElse(null), "ban")) event.reply()
			.withEphemeral(true).withContent("You do not have permission to run that command") else event.presentModal()
			.withCustomId(String.format("%s-%s", idPrefix, event.targetId.asString()))
			.withTitle("Softban Menu")
			.withComponents(
				ActionRow.of(TextInput.small("duration", "Ban Duration (Minutes)").required(false)),
				ActionRow.of(TextInput.paragraph("reason", "Ban Reason"))
			)
	}

	override val idPrefix: String
		get() = "softban"

	override fun handle(event: ModalSubmitInteractionEvent): Mono<*> {
		val toBan: Snowflake = Snowflake.of(event.customId.split("-").toTypedArray()[1])
		var duration = -1
		var reason = ""
		for (component in event.components) {
			if (component.type == MessageComponent.Type.ACTION_ROW) {
				if (component.data.components().isAbsent) continue
				for (data in component.data.components().get()) {
					if (data.customId().isAbsent) continue
					when (data.customId().get()) {
						"duration" -> duration = if (data.value().isAbsent || data.value().get() == "") -1 else data.value().get().toInt()
						"reason" -> {
							if (data.value().isAbsent) return event.reply().withContent("Please specify a ban reason")
							reason = data.value().get()
						}
					}
				}
			}
		}
		val finalDuration = duration
		val finalReason = reason
		return event.interaction
			.guild
			.flatMap { guild: Guild -> guild.getMemberById(toBan) }
			.flatMap { member: Member? ->
				if(member == null) event.reply().withEphemeral(true).withContent("Cannot find member")
				else {
					val result = banManager.ban(
						member, finalReason, finalDuration,
						event.interaction.user.username
					)
					if (result.error != null || result.value == null) event.reply().withEphemeral(true)
						.withContent(result.error ?: "Unknown Error")
					else result.value.and(event.reply().withEphemeral(true).withContent("Ban issued successfully"))
				}
			}
	}
}
