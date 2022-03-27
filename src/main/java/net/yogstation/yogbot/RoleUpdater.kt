package net.yogstation.yogbot

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.`object`.entity.Guild
import discord4j.core.`object`.entity.Member
import discord4j.gateway.intent.Intent
import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.LogChannel
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.sql.SQLException

@Component
class RoleUpdater(
	private val databaseManager: DatabaseManager,
	private val client: GatewayDiscordClient,
	private val discordConfig: DiscordConfig,
	private val logChannel: LogChannel,
	private val channelsConfig: DiscordChannelsConfig
) {
	private val logger: Logger = LoggerFactory.getLogger(javaClass)
	private val softbanRole = Snowflake.of(discordConfig.softBanRole)
	private val donorRole = Snowflake.of(discordConfig.donorRole)
	private val verificationRole = Snowflake.of(discordConfig.byondVerificationRole)

	@Scheduled(fixedRate = 60000)
	fun handleDonor() {
		if (!client.gatewayResources.intents.contains(Intent.GUILD_MEMBERS)) {
			logger.error("Unable to process unbans and donors, lacking GUILD_MEMBERS intent")
			return
		}

		val guild: Guild? = client.getGuildById(Snowflake.of(discordConfig.mainGuildID)).block()
		if (guild == null) {
			logger.error("Unable to locate guild, cannot handle unbans and donors")
			return
		}

		val bannedSnowflakes: MutableSet<Snowflake> = HashSet()
		val donorSnowflakes: MutableSet<Snowflake> = HashSet()
		val verifiedSnowflakes: MutableSet<Snowflake> = HashSet()
		try {
			databaseManager.yogbotDbConnection.use { connection ->
				val stmt = connection.createStatement()
				stmt.use { statement ->
					statement.executeQuery("SELECT DISTINCT discord_id FROM bans WHERE (expires_at > NOW() OR expires_at IS NULL) AND revoked_at IS NULL;")
						.use { results ->
							while (results.next()) {
								bannedSnowflakes.add(Snowflake.of(results.getLong("discord_id")))
							}
						}
				}
			}
			databaseManager.byondDbConnection.use { connection ->
				val stmt = connection.createStatement()
				stmt.use { statement ->
					statement.executeQuery("SELECT DISTINCT player.discord_id FROM ${databaseManager.prefix("player")} as player JOIN ${databaseManager.prefix("donors")} donor on player.ckey = donor.ckey WHERE (expiration_time > NOW()) AND revoked IS NULL;")
						.use { results ->
							while (results.next()) {
								donorSnowflakes.add(Snowflake.of(results.getLong("discord_id")))
							}
						}
				}
			}
			databaseManager.byondDbConnection.use { connection ->
				val stmt = connection.createStatement()
				stmt.use { statement ->
					statement.executeQuery("SELECT DISTINCT discord_id FROM ${databaseManager.prefix("player")};")
						.use { results ->
							while (results.next()) {
								verifiedSnowflakes.add(Snowflake.of(results.getLong("discord_id")))
							}
						}
				}
			}
		} catch (e: SQLException) {
			logger.error("Error fetching bans or donors", e)
			return
		}

		guild.members.flatMap { member ->
			updateRole(bannedSnowflakes, member, softbanRole, {
				it.addRole(softbanRole, "Reapplying softban").and(logChannel.log("Softban automatically reapplied to ${it.username}"))
			}) {
				it.removeRole(softbanRole, "Ban expired").and(logChannel.log("Bans expired for ${it.username}"))
			}.and(
				updateRole(donorSnowflakes, member, donorRole, {
					it.addRole(donorRole, "Giving donor role")
				}) {
					it.removeRole(donorRole, "Donor status expired").and(
						guild.getChannelById(Snowflake.of(channelsConfig.channelStaffPublic)).flatMap { channel ->
							channel.restChannel.createMessage("${it.mention} Your donor tag on discord has been removed because we could not verify your donator status, ensure your discord is verified properly.")
						}
					)
				}
			).and(
				updateRole(verifiedSnowflakes, member, verificationRole, {
					it.addRole(verificationRole, "Reapplying donor role")
				}) {
					it.removeRole(donorRole, "Unable to verify")
				}
			)
		}.subscribe()
	}

	private fun updateRole(
		snowflakeSet: MutableSet<Snowflake>,
		member: Member,
		role: Snowflake,
		applyRole: (member: Member) -> Mono<*>,
		removeRole: (member: Member) -> Mono<*>
	) = if (snowflakeSet.contains(member.id) != member.roleIds.contains(role)) {
		if (snowflakeSet.contains(member.id)) {
			applyRole.invoke(member)
		} else {
			removeRole.invoke(member)
		}
	} else
		Mono.empty()


}
