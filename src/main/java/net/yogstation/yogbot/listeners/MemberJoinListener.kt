package net.yogstation.yogbot.listeners

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.guild.MemberJoinEvent
import net.yogstation.yogbot.bans.BanManager
import net.yogstation.yogbot.bans.StickyRoleManager
import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.util.DiscordUtil
import net.yogstation.yogbot.util.LogChannel
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class MemberJoinListener(val client: GatewayDiscordClient, private val logChannel: LogChannel, private val banManager: BanManager, private val stickyRoleManager: StickyRoleManager) {

	init {
		client.on(MemberJoinEvent::class.java) { this.handle(it) }.subscribe()
	}

	fun handle(event: MemberJoinEvent): Mono<*> {
		return logChannel.log("**${event.member.username}#${event.member.discriminator}** joined the server")
			.and(banManager.onLogin(event.member))
			.and(stickyRoleManager.doLogin(event.member))
	}
}
