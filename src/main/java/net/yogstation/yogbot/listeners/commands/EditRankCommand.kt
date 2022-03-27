package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import net.yogstation.yogbot.DatabaseManager
import kotlin.Throws
import java.sql.SQLException
import discord4j.core.event.domain.message.MessageCreateEvent
import java.sql.PreparedStatement
import reactor.core.publisher.Mono
import discord4j.common.util.Snowflake
import discord4j.core.`object`.entity.Guild
import discord4j.core.`object`.entity.Member
import net.yogstation.yogbot.util.DiscordUtil

abstract class EditRankCommand(
	discordConfig: DiscordConfig,
	permissions: PermissionsManager,
	protected val database: DatabaseManager
) : PermissionsCommand(
	discordConfig, permissions
) {
	@Throws(SQLException::class)
	protected fun giveRank(
		event: MessageCreateEvent, target: CommandTarget, rankCheckStmt: PreparedStatement,
		rankSetStmt: PreparedStatement, role: Long
	): Mono<*> {
		val errors = target.populate(database)
		if (errors != null) return DiscordUtil.reply(event, errors)
		val snowflake: Snowflake = target.snowflake ?: return DiscordUtil.reply(event, "Unable to get discord id")

		var result: Mono<*> = Mono.empty<Any>()
		rankCheckStmt.setString(1, target.ckey)
		val rankCheckResults = rankCheckStmt.executeQuery()
		result = if (rankCheckResults.next()) {
			result.and(DiscordUtil.send(event, "User already has in-game rank."))
		} else {
			rankSetStmt.setString(1, target.ckey)
			rankSetStmt.execute()
			if (rankSetStmt.updateCount > 0) {
				result.and(DiscordUtil.send(event, "In game rank given successfully"))
			} else {
				result.and(DiscordUtil.send(event, "Failed to give in game rank"))
			}
		}
		rankCheckResults.close()

		return result.and(event.guild
			.flatMap { guild: Guild ->
				guild.getMemberById(snowflake)
					.flatMap { member: Member ->
						member.addRole(Snowflake.of(role))
							.and(DiscordUtil.send(event, "Added discord role"))
					}
			})
	}

	@Throws(SQLException::class)
	protected fun removeRank(
		event: MessageCreateEvent, target: CommandTarget, rankSetStmt: PreparedStatement,
		role: Long
	): Mono<*> {
		val errors = target.populate(database)
		if (errors != null) return DiscordUtil.reply(event, errors)
		val snowflake: Snowflake = target.snowflake ?: return DiscordUtil.reply(event, "Unable to get discord id")
		var result: Mono<*> = Mono.empty<Any>()
		rankSetStmt.setString(1, target.ckey)
		rankSetStmt.execute()
		result = if (rankSetStmt.updateCount > 0) {
			result.and(DiscordUtil.send(event, "In game rank removed successfully"))
		} else {
			result.and(DiscordUtil.send(event, "Failed to remove in game rank"))
		}
		return result.and(event.guild
			.flatMap { guild: Guild ->
				guild.getMemberById(snowflake)
					.flatMap { member: Member ->
						member.removeRole(Snowflake.of(role))
							.and(DiscordUtil.send(event, "Removed discord role"))
					}
			})
	}
}
