package net.yogstation.yogbot.listeners.interactions

import discord4j.common.util.Snowflake
import discord4j.core.`object`.entity.Member
import discord4j.core.`object`.entity.User
import discord4j.core.event.domain.interaction.UserInteractionEvent
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class StaffBanCommand(private val permissions: PermissionsManager, private val discordConfig: DiscordConfig) :
	IUserCommand {
	override val name = "Staff Public Ban"

	override val uri = "staffban.json"

	override fun handle(event: UserInteractionEvent): Mono<*> {
		if (event.interaction.guildId.isEmpty) return event.reply().withEphemeral(true)
			.withContent("Must be used in a guild")

		return if (!permissions.hasPermission(event.interaction.member.orElse(null), "staffban")) event.reply()
			.withEphemeral(true).withContent("You do not have permission to run that command") else event.targetUser
			.flatMap { user: User ->
				user.asMember(event.interaction.guildId.get()).flatMap { member: Member ->
					val roles = member.roleIds
					if (roles.contains(Snowflake.of(discordConfig.secondWarningRole))) {
						member.addRole(Snowflake.of(discordConfig.staffPublicBanRole))
							.and(event.reply().withContent("${member.mention} was banned from staff public"))
					} else if (roles.contains(Snowflake.of(discordConfig.firstWarningRole))) {
						member.addRole(Snowflake.of(discordConfig.secondWarningRole))
							.and(event.reply().withContent("${member.mention} was given the second warning role"))
					} else {
						member.addRole(Snowflake.of(discordConfig.firstWarningRole))
							.and(event.reply().withContent("${member.mention} was given the first warning role"))
					}
				}
			}
	}
}
