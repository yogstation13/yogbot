package net.yogstation.yogbot.http

import discord4j.core.GatewayDiscordClient
import discord4j.gateway.GatewayClient
import discord4j.gateway.intent.Intent
import net.yogstation.yogbot.util.HttpUtil
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpEntity
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class HealthController(val client: GatewayDiscordClient) {
	private val logger: Logger = LoggerFactory.getLogger(javaClass)

	@GetMapping("/health")
	fun getHealth(): Mono<HttpEntity<String>> {
		logger.info("Health check begin")

		if(!client.gatewayResources.intents.contains(Intent.GUILD_MEMBERS)) {
			logger.error("GUILD_MEMBERS intent unavailable")
			return HttpUtil.response("GUILD_MEMBERS intent required", HttpStatus.SERVICE_UNAVAILABLE)
		}

		val gatewayGroup = client.gatewayClientGroup
		val shardCount = gatewayGroup.shardCount

		logger.info("Checking the health of the $shardCount shards")

		val shards: MutableList<GatewayClient> = ArrayList()
		for(i in 0 until shardCount) {
			val shard = gatewayGroup.find(i).orElse(null) ?: continue
			shards.add(shard)
		}

		if(shards.size < shardCount) {
			logger.error("Only located {}/{} shards", shards.size, shardCount)
			return HttpUtil.response("${shardCount - shards.size} Shards are unavailable", HttpStatus.SERVICE_UNAVAILABLE)
		}

		return Flux.fromIterable(shards).filterWhen { gatewayClient -> gatewayClient.isConnected.map { !it } }.count().flatMap { disconnectCount ->
			if(disconnectCount > 0) {
				logger.error("There are $disconnectCount shards not connected")
				HttpUtil.response("$disconnectCount shards are disconnected", HttpStatus.SERVICE_UNAVAILABLE)
			} else {
				logger.info("All shards working as intended")
				HttpUtil.ok("All shards running normally")
			}
		}
	}
}
