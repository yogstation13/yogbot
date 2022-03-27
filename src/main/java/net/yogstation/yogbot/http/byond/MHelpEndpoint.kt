package net.yogstation.yogbot.http.byond

import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import net.yogstation.yogbot.config.ByondConfig
import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.http.byond.payloads.CkeyMessagePayload
import org.springframework.http.HttpEntity
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
class MHelpEndpoint(private val channelsConfig: DiscordChannelsConfig, client: GatewayDiscordClient,
					byondConfig: ByondConfig
):
	MessageRelayEndpoint(client, byondConfig) {

	override val channelId: Snowflake = Snowflake.of(channelsConfig.channelMentor)

	@PostMapping("/byond/mhelp")
	fun handleMhelp(@RequestBody payload: CkeyMessagePayload): Mono<HttpEntity<String>> {
		val keyError = validateKey(payload.key);
		if(keyError != null) return keyError;
		return receiveData(payload)
	}

}
