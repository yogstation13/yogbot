package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.permissions.PermissionsManager
import net.yogstation.yogbot.DatabaseManager
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.lang.StringBuilder
import java.sql.SQLException

@Component
class TicketCommand(
	discordConfig: DiscordConfig,
	permissions: PermissionsManager,
	private val database: DatabaseManager
) : PermissionsCommand(
	discordConfig, permissions
) {
	override val requiredPermissions = "note"

	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val args = event.message.content.split(" ").toTypedArray()
		return if (args.size < 2) {
			DiscordUtil.reply(event, String.format("Usage is `${discordConfig.commandPrefix}ticket <help|get>`"))
		} else when (args[1]) {
			"help" -> ticketHelp(event, args)
			"get" -> getTicket(event, args)
			else -> DiscordUtil.reply(event, String.format("Unknown subcommand `%s`", args[1]))
		}
	}

	private fun ticketHelp(event: MessageCreateEvent, args: Array<String>): Mono<*> {
		if (args.size < 3) {
			return DiscordUtil.reply(
				event, String.format(
					"""
					Gets information on a ticket from the database.
					Use `%sticket help <subcommand>` for help on a specific subcommand
					""".trimIndent(),
					discordConfig.commandPrefix
				)
			)
		}
		return if (args[2] == "get") DiscordUtil.reply(
			event, String.format(
				"""Gets either the content of a ticket from a specific round, or the list of tickets from that round
	Usage: `%sticket get <round_id> [ticket_id]`""",
				discordConfig.commandPrefix
			)
		) else DiscordUtil.reply(event, String.format("Unknown subcommand `%s`", args[1]))
	}

	private fun getTicket(event: MessageCreateEvent, args: Array<String>): Mono<*> {
		if (args.size < 3) {
			return DiscordUtil.reply(event, String.format("Usage: `%s get <round_id> [ticket_id]`", args[0]))
		}
		val roundId = args[2]
		if (args.size < 4) {
			try {
				database.byondDbConnection.use { connection ->
					connection.prepareStatement("""
					SELECT * FROM (
						SELECT `tickets`.`ticket_id`, `tickets`.`ckey`, `tickets`.`a_ckey`, `interactions`.`text`,
						RANK() OVER (PARTITION BY `tickets`.`ticket_id` ORDER BY `interactions`.`id`) as `rank`
						FROM ${database.prefix("admin_tickets")} as tickets
						JOIN ${database.prefix("admin_ticket_interactions")} interactions on tickets.id = interactions.ticket_id
						WHERE `tickets`.`round_id` = ?
					) as ticket_list WHERE ticket_list.`rank` = 1;
					"""
					).use { lookupStatement ->
						lookupStatement.setString(1, roundId)
						val resultSet = lookupStatement.executeQuery()
						var hasData = false
						val builder = StringBuilder("Tickets for round ").append(roundId).append(":\n```\n")
						while (resultSet.next()) {
							hasData = true
							builder.append("#")
							builder.append(resultSet.getString("ticket_id"))
							builder.append(" ")
							builder.append(resultSet.getString("ckey"))
							builder.append(": ")
							builder.append(resultSet.getString("text"))
							builder.append(", ")
							builder.append(resultSet.getString("a_ckey"))
							builder.append("\n")
						}
						resultSet.close()
						if (!hasData) return DiscordUtil.reply(event, String.format("Failed to get ticket for round %s", roundId))
						builder.append("```")
						return DiscordUtil.reply(event, builder.toString())
					}
				}
			} catch (e: SQLException) {
				logger.error("Failed to get admin tickets", e)
				return DiscordUtil.reply(event, "Failed to get tickets.")
			}
		}
		val ticketId = args[3]
		try {
			database.byondDbConnection.use { connection ->
				connection.prepareStatement("""
				SELECT `interactions`.`when`, `interactions`.`user`, `interactions`.`text`
				FROM ${database.prefix("admin_tickets")} as tickets
				JOIN ${database.prefix("admin_ticket_interactions")} interactions on tickets.id = interactions.ticket_id
				WHERE `tickets`.`round_id` = ? AND `tickets`.`ticket_id` = ?;
			"""
				).use { preparedStatement ->
					preparedStatement.setString(1, roundId)
					preparedStatement.setString(2, ticketId)
					val resultSet = preparedStatement.executeQuery()
					var hasData = false
					val builder = StringBuilder("Ticket ").append(ticketId)
					builder.append(" for round ").append(roundId).append("\n```\n")
					while (resultSet.next()) {
						hasData = true
						builder.append(resultSet.getTimestamp("when").toString())
						builder.append(": ").append(resultSet.getString("user"))
						builder.append(": ").append(resultSet.getString("text")).append("\n")
					}
					if (!hasData) return DiscordUtil.reply(
						event,
						String.format("Unable to find ticket %s in round %s", ticketId, roundId)
					)
					builder.append("```")
					return DiscordUtil.reply(event, builder.toString())
				}
			}
		} catch (e: SQLException) {
			logger.error("Error getting ticket", e)
			return DiscordUtil.reply(event, "Failed to get ticket.")
		}
	}

	override val description = "Gets ticket information."
	override val name = "ticket"
}
