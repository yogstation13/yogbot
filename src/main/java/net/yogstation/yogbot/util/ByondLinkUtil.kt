package net.yogstation.yogbot.util

import discord4j.common.util.Snowflake
import net.yogstation.yogbot.DatabaseManager
import org.slf4j.LoggerFactory
import java.sql.SQLException

object ByondLinkUtil {
	private val LOGGER = LoggerFactory.getLogger(ByondLinkUtil::class.java)
	fun getMemberID(ckey: String, database: DatabaseManager): YogResult<Snowflake?, String?> {
		try {
			database.byondDbConnection.use { connection ->
				connection.prepareStatement(
					"SELECT discord_id FROM `${database.prefix("player")}` WHERE `ckey` = ? AND discord_id IS NOT NULL;"
				).use { playerStmt ->
					playerStmt.setString(1, ckey)
					val playerResults = playerStmt.executeQuery()
					if (!playerResults.next()) {
						playerResults.close()
						return YogResult.error("No user with this ckey has a linked discord account")
					}
					val discordID = playerResults.getLong("discord_id")
					if (playerResults.next()) {
						playerResults.close()
						return YogResult.error("More than 1 of this ckey with a Discord ID, this makes no sense at all!")
					}
					playerResults.close()
					return YogResult.success(Snowflake.of(discordID))
				}
			}
		} catch (e: SQLException) {
			LOGGER.error("SQL Error", e)
			return YogResult.error("A SQL Error has occurred.")
		}
	}

	fun getCkey(snowflake: Snowflake, database: DatabaseManager): YogResult<String?, String?> {
		try {
			database.byondDbConnection.use { connection ->
				connection.prepareStatement(
					"SELECT ckey FROM `${database.prefix("player")}` WHERE `discord_id` = ?"
				).use { ckeyStmt ->
					ckeyStmt.setLong(1, snowflake.asLong())
					val ckeyResults = ckeyStmt.executeQuery()
					if (!ckeyResults.next()) {
						ckeyResults.close()
						return YogResult.error("Cannot find linked byond account.")
					}
					val ckey = ckeyResults.getString("ckey")
					if (ckeyResults.next()) {
						ckeyResults.close()
						return YogResult.error("Multiple accounts linked to discord ID")
					}
					ckeyResults.close()
					return YogResult.success(ckey)
				}
			}
		} catch (e: SQLException) {
			LOGGER.error("Error getting notes", e)
			return YogResult.error("A SQL Error has occurred")
		}
	}
}
