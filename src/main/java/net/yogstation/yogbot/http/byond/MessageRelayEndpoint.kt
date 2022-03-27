package net.yogstation.yogbot.http.byond

import com.fasterxml.jackson.databind.JsonNode
import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import net.yogstation.yogbot.config.ByondConfig
import net.yogstation.yogbot.http.ByondEndpoint
import net.yogstation.yogbot.http.byond.payloads.CkeyMessagePayload
import net.yogstation.yogbot.util.HttpUtil
import org.springframework.http.HttpEntity
import reactor.core.publisher.Mono

abstract class MessageRelayEndpoint protected constructor(val client: GatewayDiscordClient, byondConfig: ByondConfig) : ByondEndpoint(
	byondConfig
) {
	abstract val channelId: Snowflake
	fun receiveData(payload: CkeyMessagePayload): Mono<HttpEntity<String>> {
		return client.getChannelById(channelId)
			.flatMap { channel -> channel.restChannel.createMessage("**${payload.ckey}**: ${payload.message}").then(HttpUtil.ok("Message sent")) }
	}
}
