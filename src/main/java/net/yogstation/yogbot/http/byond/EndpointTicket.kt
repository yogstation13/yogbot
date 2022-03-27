package net.yogstation.yogbot.http.byond

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import discord4j.core.GatewayDiscordClient
import net.yogstation.yogbot.DatabaseManager
import net.yogstation.yogbot.config.ByondConfig
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.http.byond.payloads.TicketPayload
import org.springframework.http.HttpEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono

@RestController
class EndpointTicket(webClient: WebClient, mapper: ObjectMapper, database: DatabaseManager,
					 client: GatewayDiscordClient, discordConfig: DiscordConfig, byondConfig: ByondConfig
) : DiscordWebhookEndpoint(webClient, mapper, database, client, discordConfig, byondConfig) {

	override val webhookUrl = discordConfig.ticketWebhookUrl

	@PostMapping("/byond/ticket")
	fun receiveData(@RequestBody ticketPayload: TicketPayload): Mono<HttpEntity<String>> {
		val keyError = validateKey(ticketPayload.key);
		if(keyError != null) return keyError;

		val node = mapper.createObjectNode()
		node.put("username", ticketPayload.roundId)
		node.put("content", "**${ticketPayload.user}, Ticket #${ticketPayload.ticketId}:** ${ticketPayload.message}")
		node.set<JsonNode>("allowed_mentions", mapper.createObjectNode().set("parse", mapper.createArrayNode()))
		return sendData(node)
	}
}
