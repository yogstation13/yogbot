package net.yogstation.yogbot.listeners.commands

import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.DatabaseManager
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.sql.SQLException

@Component
class ListAdminsCommand(discordConfig: DiscordConfig, private val database: DatabaseManager) : TextCommand(
	discordConfig
) {
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		try {
			database.byondDbConnection.use { connection ->
				connection.prepareStatement(String.format("SELECT ckey,`rank` FROM `%s`", database.prefix("admin")))
					.use { stmt ->
						val results = stmt.executeQuery()
						val builder = StringBuilder("Current Admins:")
						while (results.next()) {
							builder.append("\n")
							builder.append(results.getString("ckey"))
							builder.append(" - ")
							builder.append(results.getString("rank"))
						}
						results.close()
						return DiscordUtil.reply(event, builder.toString())
					}
			}
		} catch (e: SQLException) {
			logger.error("Error with SQL Query", e)
			return DiscordUtil.reply(event, "An error has occurred")
		}
	}

	override val description = "Get current admins."
	override val name = "listadmins"
}
