package net.yogstation.yogbot.http.byond

import com.fasterxml.jackson.databind.ObjectMapper
import discord4j.core.GatewayDiscordClient
import net.yogstation.yogbot.DatabaseManager
import net.yogstation.yogbot.config.ByondConfig
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.http.byond.payloads.CkeyMessagePayload
import org.springframework.http.HttpEntity
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono

@RestController
class MSayMessageEndpoint(webClient: WebClient, mapper: ObjectMapper, database: DatabaseManager,
						  client: GatewayDiscordClient, discordConfig: DiscordConfig, byondConfig: ByondConfig
) : DiscordWebhookEndpoint(webClient, mapper, database, client, discordConfig, byondConfig) {

	override val webhookUrl: String
		get() = discordConfig.msayWebhookUrl

	@PostMapping("/byond/msaymessage")
	fun handleMsayMessage(@RequestBody payload: CkeyMessagePayload): Mono<HttpEntity<String>> {
		val keyError = validateKey(payload.key);
		if(keyError != null) return keyError;

		return handleData(payload)
	}
}
