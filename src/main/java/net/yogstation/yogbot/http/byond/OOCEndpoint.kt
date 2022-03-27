package net.yogstation.yogbot.http.byond

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import net.yogstation.yogbot.config.ByondConfig
import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.http.byond.payloads.CkeyMessagePayload
import org.springframework.http.HttpEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
class OOCEndpoint(client: GatewayDiscordClient, private val channelsConfig: DiscordChannelsConfig,
				  byondConfig: ByondConfig
) : MessageRelayEndpoint(client, byondConfig) {
	override val channelId: Snowflake = Snowflake.of(channelsConfig.channelOOC)

	@PostMapping("/byond/oocmessage")
	fun handleMhelp(@RequestBody payload: CkeyMessagePayload): Mono<HttpEntity<String>> {
		val keyError = validateKey(payload.key);
		if(keyError != null) return keyError;
		return receiveData(payload)
	}
}
