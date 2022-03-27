package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import net.yogstation.yogbot.DatabaseManager
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.util.DiscordUtil
import reactor.core.publisher.Mono
import org.springframework.stereotype.Component
import java.sql.SQLException

@Component
class AddMentorCommand(discordConfig: DiscordConfig, permissions: PermissionsManager, database: DatabaseManager) :
	EditRankCommand(
		discordConfig, permissions, database
	) {

	override val name = "addmentor"
	override val requiredPermissions = "addmentor"
	override val description = "Gives a user Mentor rank"

	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val target = getTarget(event)
			?: return DiscordUtil.reply(event, "Correct usage: `${discordConfig.commandPrefix}addmentor <ckey or @Username>`")
		try {
			database.byondDbConnection.use { connection ->
				connection.prepareStatement(
					"SELECT ckey FROM `${database.prefix("mentor")}` WHERE `ckey` = ?;"
				).use { mentorCheckStmt ->
					connection.prepareStatement(
						"INSERT INTO `${database.prefix("mentor")}` (`ckey`, `position`) VALUES (?, 'Mentor');"
					).use { mentorSetStatement ->
						return giveRank(
							event,
							target,
							mentorCheckStmt,
							mentorSetStatement,
							discordConfig.mentorRole
						)
					}
				}
			}
		} catch (e: SQLException) {
			logger.error("Error in AddMentorCommand", e)
			return DiscordUtil.reply(event, "Unable to access database.")
		}
	}
}
