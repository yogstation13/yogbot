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
class RemoveAOCommand(discordConfig: DiscordConfig, permissions: PermissionsManager, database: DatabaseManager) :
	EditRankCommand(
		discordConfig, permissions, database
	) {
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val target = getTarget(event)
			?: return DiscordUtil.reply(event, "Correct usage: `${discordConfig.commandPrefix}removeao <ckey or @Username>`")
		try {
			database.byondDbConnection.use { connection ->
				connection.prepareStatement(
					"DELETE FROM `${database.prefix("admin")}` WHERE `ckey` = ?;"
				).use { adminSetStmt -> return removeRank(event, target, adminSetStmt, discordConfig.aoRole) }
			}
		} catch (e: SQLException) {
			logger.error("Error in AddAOCommand", e)
			return DiscordUtil.reply(event, "Unable to access database.")
		}
	}

	override val name = "removeao"
	override val requiredPermissions = "removeao"
	override val description = "Remove a user's AO rank."
}
