package net.yogstation.yogbot.bans

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.`object`.entity.Guild
import discord4j.core.`object`.entity.Member
import discord4j.gateway.intent.Intent
import net.yogstation.yogbot.DatabaseManager
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.LogChannel
import net.yogstation.yogbot.util.YogResult
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.sql.SQLException

@Component
class BanManager(val client: GatewayDiscordClient, val discordConfig: DiscordConfig, val database: DatabaseManager, private val logChannel: LogChannel) {
	private val logger: Logger = LoggerFactory.getLogger(this::class.java)
	private val softbanRole = Snowflake.of(discordConfig.softBanRole)

	fun ban(member: Member, reason: String, duration: Int, author: String): YogResult<Mono<*>?, String?> {

		val banMessage: StringBuilder = StringBuilder("You have been banned from ")
		banMessage.append(discordConfig.serverName)
		banMessage.append(" for `")
		banMessage.append(reason)
		banMessage.append("` It will ")
		if (duration > 0) {
			banMessage.append("expire in ")
			banMessage.append(duration)
			banMessage.append(" minutes.")
		} else {
			banMessage.append("not expire.")
		}

		try {
			database.yogbotDbConnection.use { connection ->
				if(duration > 0) {
					connection.prepareStatement("INSERT INTO bans (discord_id, reason, expires_at) VALUE (?, ?, NOW() + INTERVAL ? MINUTE )").use {
						it.setLong(1, member.id.asLong())
						it.setString(2, reason)
						it.setInt(3, duration)
						it.execute()
						if(it.updateCount < 1) {
							logger.error("Failed to create ban")
							return YogResult.error("Failed to create ban")
						}
					}
				} else {
					connection.prepareStatement("INSERT INTO bans (discord_id, reason) VALUE (?, ?)").use {
						it.setLong(1, member.id.asLong())
						it.setString(2, reason)
						it.execute()
						if(it.updateCount < 1) {
							return YogResult.error("Failed to create ban")
						}
					}
				}
			}
		} catch (e: SQLException) {
			logger.error("Error applying ban", e)
			return YogResult.error("Error applying ban")
		}

		return YogResult.success(member.addRole(
			softbanRole,
			"${if (duration <= 0) "Permanent" else "Temporary"} softban by $author for ${reason.trim()}")
			.and(member.privateChannel
				.flatMap { privateChannel -> privateChannel.createMessage(banMessage.toString()) }).and(
				logChannel.log("${member.username} was banned ${if (duration <= 0) "permanently" else "for $duration minutes"} by $author for $reason")
				))
	}

	fun unban(member: Member, reason: String, user: String): YogResult<Mono<*>?, String?> {
		try {
			database.yogbotDbConnection.use { connection ->
				connection.prepareStatement("UPDATE bans SET revoked_at = NOW() WHERE discord_id = ? AND revoked_at IS NULL AND (expires_at > NOW() OR expires_at IS NULL)").use {
					it.setLong(1, member.id.asLong())
					it.execute()
					if (it.updateCount < 1) {
						return YogResult.error("No bans were modified")
					}
				}
			}
		} catch (e: SQLException) {
			logger.error("Error removing ban", e)
			return YogResult.error("Error removing ban")
		}

		return YogResult.success(member.removeRole(
			softbanRole,
			"Unbanned by $user for $reason").and(logChannel.log("${member.username} was unbanned by $user for $reason"))
		)
	}

	fun onLogin(member: Member): Mono<*> {
		try {
			database.yogbotDbConnection.use { connection ->
				connection.prepareStatement("SELECT 1 FROM bans WHERE (expires_at > NOW() OR expires_at IS NULL) AND revoked_at IS NULL AND discord_id = ?;").use { statement ->
					statement.setLong(1, member.id.asLong())
					statement.executeQuery().use {
						return if(it.next()) {
							logChannel.log("${member.displayName} is banned, reapplying the ban role")
								.and(member.addRole(softbanRole))
						} else {
							Mono.empty<Any>()
						}
					}
				}
			}
		} catch (e: SQLException) {
			logger.error("Error checking for bans", e)
			return logChannel.log("Error checking the ban status of ${member.displayName}.")
		}
	}
}
