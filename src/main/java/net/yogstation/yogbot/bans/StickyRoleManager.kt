package net.yogstation.yogbot.bans

import discord4j.common.util.Snowflake
import discord4j.core.`object`.entity.Member
import net.yogstation.yogbot.DatabaseManager
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.LogChannel
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.sql.SQLException

@Component
class StickyRoleManager(private val discordConfig: DiscordConfig, private val logChannel: LogChannel, private val databaseManager: DatabaseManager) {
	private val logger: Logger = LoggerFactory.getLogger(javaClass)

	fun doLogout(member: Member?): Mono<*> {
		if(member == null) return logChannel.log("Unable to check for sticky roles")
		var stickyRoleCount = 0
		try {
			databaseManager.yogbotDbConnection.use { connection ->
				connection.prepareStatement("INSERT IGNORE INTO user_sticky_roles (discord_id, role_id) VALUES (?, ?)").use { statement ->
					member.roleIds.filter { discordConfig.isStickyRole(it.asLong()) }.forEach {
						stickyRoleCount++
						statement.setLong(1, member.id.asLong())
						statement.setLong(2, it.asLong())
						statement.addBatch()
					}
					if(stickyRoleCount > 0) statement.executeBatch()
				}
			}
		} catch (e: SQLException) {
			logger.error("Error saving sticky roles", e)
			return logChannel.log("A SQL Error occurred while saving sticky roles")
		}
		if(stickyRoleCount > 0) {
			return member.privateChannel.flatMap { channel -> channel.createMessage("You have left the ${discordConfig.serverName} server with $stickyRoleCount sticky role${if(stickyRoleCount != 1) "s" else ""}. They will be reapplied when you rejoin.") }
				.and(logChannel.log("**${member.tag}** left the server with $stickyRoleCount sticky role${if(stickyRoleCount != 1) "s" else ""}"))
		}
		return Mono.empty<Any>()
	}

	fun doLogin(member: Member): Mono<*> {
		var stickyRoleCount = 0
		var resultMono: Mono<*> = Mono.empty<Any>()
		try {
			databaseManager.yogbotDbConnection.use { connection ->
				connection.prepareStatement("SELECT role_id FROM user_sticky_roles WHERE discord_id = ?").use { statement ->
					statement.setLong(1, member.id.asLong())
					statement.executeQuery().use { resultSet ->
						while(resultSet.next()) {
							stickyRoleCount++;
							resultMono = resultMono.and(member.addRole(Snowflake.of(resultSet.getLong("role_id"))))
						}
					}
				}
				connection.prepareStatement("DELETE FROM user_sticky_roles WHERE discord_id = ?").use { statement ->
					statement.setLong(1, member.id.asLong())
					statement.executeUpdate()
				}
			}
		} catch (e: SQLException) {
			logger.error("An error occurred while loading sticky bans", e)
			return resultMono.and(logChannel.log("A SQL Error occurred while loading sticky bans"))
		}
		if(stickyRoleCount > 0) {
			resultMono = resultMono.and(logChannel.log("**${member.tag}** rejoined the server with $stickyRoleCount sticky role${if(stickyRoleCount != 1) "s" else ""}"))
		}
		return resultMono
	}
}
