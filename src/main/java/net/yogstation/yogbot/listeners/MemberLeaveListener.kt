package net.yogstation.yogbot.listeners

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.event.domain.guild.MemberLeaveEvent
import net.yogstation.yogbot.bans.StickyRoleManager
import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.util.DiscordUtil
import net.yogstation.yogbot.util.LogChannel
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class MemberLeaveListener(val client: GatewayDiscordClient, private val logChannel: LogChannel, private val stickyRoleManager: StickyRoleManager) {

	init {
		client.on(MemberLeaveEvent::class.java) { this.handle(it) }.subscribe()
	}

	fun handle(event: MemberLeaveEvent): Mono<*> {
		return logChannel.log("**${event.user.username}#${event.user.discriminator}** left the server")
			.and(stickyRoleManager.doLogout(event.member.orElse(null)))
	}
}
