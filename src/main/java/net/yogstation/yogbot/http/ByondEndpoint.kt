package net.yogstation.yogbot.http

import com.fasterxml.jackson.databind.ObjectMapper
import net.yogstation.yogbot.config.ByondConfig
import org.slf4j.LoggerFactory
import org.springframework.http.HttpEntity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import reactor.core.publisher.Mono


abstract class ByondEndpoint(protected val byondConfig: ByondConfig) {

	fun validateKey(key: String): Mono<HttpEntity<String>>? {
		if (key != byondConfig.serverWebhookKey) return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid key"))
		return null
	}

	companion object {
		private val mapper = ObjectMapper()
		private val LOGGER = LoggerFactory.getLogger(ByondEndpoint::class.java)
	}
}
