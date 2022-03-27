package net.yogstation.yogbot.listeners.commands

import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.DatabaseManager
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.sql.SQLException

@Component
class RemoveMentorCommand(discordConfig: DiscordConfig, permissions: PermissionsManager, database: DatabaseManager) :
	EditRankCommand(
		discordConfig, permissions, database
	) {
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val target = getTarget(event)
			?: return DiscordUtil.reply(event, "Correct usage: `${discordConfig.commandPrefix}removementor <ckey or @Username>`")
		try {
			database.byondDbConnection.use { connection ->
				connection.prepareStatement(
					"DELETE FROM `${database.prefix("mentor")}` WHERE `ckey` = ?;"
				).use { mentorSetStatement ->
					return removeRank(
						event,
						target,
						mentorSetStatement,
						discordConfig.mentorRole
					)
				}
			}
		} catch (e: SQLException) {
			logger.error("Error in AddMentorCommand", e)
			return DiscordUtil.reply(event, "Unable to access database.")
		}
	}

	override val name = "removementor"
	override val requiredPermissions = "removementor"
	override val description = "Removes a user's Mentor rank"
}
