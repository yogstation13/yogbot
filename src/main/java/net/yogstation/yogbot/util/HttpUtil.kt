package net.yogstation.yogbot.util

import reactor.core.publisher.Mono
import org.springframework.http.HttpEntity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

object HttpUtil {
	fun <T> badRequest(body: T): Mono<HttpEntity<T>> {
		return response(body, HttpStatus.BAD_REQUEST)
	}

	fun <T> response(body: T, status: HttpStatus): Mono<HttpEntity<T>> {
		return Mono.just(ResponseEntity.status(status).body(body))
	}

	fun ok(body: String): Mono<HttpEntity<String>> {
		return response(body, HttpStatus.OK)
	}
}
