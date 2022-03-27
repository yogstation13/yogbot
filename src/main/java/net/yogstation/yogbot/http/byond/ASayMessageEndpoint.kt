package net.yogstation.yogbot.http.byond

import com.fasterxml.jackson.databind.ObjectMapper
import discord4j.core.GatewayDiscordClient
import net.yogstation.yogbot.DatabaseManager
import net.yogstation.yogbot.config.ByondConfig
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.http.byond.payloads.CkeyMessagePayload
import org.springframework.http.HttpEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono

@RestController
class ASayMessageEndpoint(webClient: WebClient, mapper: ObjectMapper, database: DatabaseManager,
						  client: GatewayDiscordClient, discordConfig: DiscordConfig, byondConfig: ByondConfig
) : DiscordWebhookEndpoint(webClient, mapper, database, client, discordConfig, byondConfig) {

	@PostMapping("/byond/asaymessage")
	fun handleAsayMessage(@RequestBody data: CkeyMessagePayload): Mono<HttpEntity<String>> {
		val keyError = validateKey(data.key);
		if(keyError != null) return keyError;

		return handleData(data)
	}

	override val webhookUrl: String
		get() = discordConfig.asayWebhookUrl
}
