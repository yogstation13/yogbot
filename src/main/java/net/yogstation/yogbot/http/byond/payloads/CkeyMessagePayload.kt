package net.yogstation.yogbot.http.byond.payloads

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.boot.context.properties.ConstructorBinding

class CkeyMessagePayload (
	@JsonProperty("key") val key: String,
	@JsonProperty("ckey") val ckey: String,
	@JsonProperty("message") val message: String)

