package net.yogstation.yogbot.http

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import discord4j.common.util.Snowflake
import discord4j.core.GatewayDiscordClient
import discord4j.core.`object`.entity.Member
import net.yogstation.yogbot.DatabaseManager
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.config.HttpConfig
import net.yogstation.yogbot.util.StringUtils
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono
import java.io.IOException
import java.net.URI
import java.security.SecureRandom
import java.sql.SQLException

@Controller
class VerificationController(
	private val webClient: WebClient,
	private val mapper: ObjectMapper,
	private val discordConfig: DiscordConfig,
	private val httpConfig: HttpConfig,
	private val database: DatabaseManager,
	private val client: GatewayDiscordClient
) {
	val oauthState: MutableMap<String, AuthIdentity> = HashMap()
	private val random = SecureRandom()

	@ResponseBody
	@GetMapping("/api/verify")
	fun doRedirect(@RequestParam(value = "state") state: String): ResponseEntity<*> {
		val urlBuilder = StringBuilder(discordConfig.oauthAuthorizeUrl).apply {
			append("?response_type=code")
			append("&client_id=").append(discordConfig.oauthClientId)
			append("&redirect_uri=").append(httpConfig.publicPath).append("api/callback")
			append("&scope=openid")
			append("&state=").append(state)
		}
		return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(urlBuilder.toString())).build<Void>()
	}

	@PostMapping(value = ["/api/callback"], consumes = [MediaType.APPLICATION_FORM_URLENCODED_VALUE])
	fun callbackPost(data: CallbackData, model: Model): String {
		val state = data.state
		val csrfToken = data.csrftoken
		if (!oauthState.containsKey(state)) {
			model.addAttribute("error", "State $state is unknown")
			return "verification/error"
		}
		val authIdentity: AuthIdentity? = oauthState[state]
		if (authIdentity == null ){
			model.addAttribute("error", "State %state is unkown")
			return "verification/error"
		}
		if (authIdentity.csrfToken == null || authIdentity.csrfToken != csrfToken) {
			model.addAttribute("error", "CSRF token mismatch")
			return "verification/error"
		}

		oauthState.remove(state)

		try {
			database.byondDbConnection.use { connection ->
				connection.prepareStatement(
					String.format(
						"SELECT discord_id FROM `%s` WHERE `ckey` = ?",
						database.prefix("player")
					)
				).use { queryStmt ->
					connection.prepareStatement(
						String.format(
							"UPDATE `%s` SET `discord_id` = ? WHERE `ckey` = ?",
							database.prefix("player")
						)
					).use { linkStmt ->
						queryStmt.setString(1, authIdentity.ckey)
						val queryResults = queryStmt.executeQuery()
						if (!queryResults.next()) {
							model.addAttribute("error", "New account detected, please login on the server at least once to proceed")
							return "verification/error"
						}
						queryResults.close()
						linkStmt.setString(1, authIdentity.snowflake.asString())
						linkStmt.setString(2, authIdentity.ckey)
						linkStmt.execute()
						if (linkStmt.updateCount < 1) {
							model.addAttribute("error", "Failed to link accounts!")
							return "verification/error"
						}
						client.getMemberById(Snowflake.of(discordConfig.mainGuildID), authIdentity.snowflake)
							.flatMap { member: Member -> member.addRole(Snowflake.of(discordConfig.byondVerificationRole)) }
							.subscribe()
						return "verification/success"
					}
				}
			}
		} catch (e: SQLException) {
			LOGGER.error("Error linking accounts", e)
			model.addAttribute("error", "An error ahs occurred")
			return "verification/error"
		}
	}

	@GetMapping("/api/callback")
	fun getCallback(
		@RequestParam(value = "error", required = false) error: String?,
		@RequestParam(value = "error_description", required = false) errorDescription: String?,
		@RequestParam(value = "state", required = false) state: String?,
		@RequestParam(value = "code", required = false) code: String?,
		model: Model
	): Mono<String> {
		if(discordConfig.oauthClientId == "") {
			model.addAttribute("error", "Verification is not implemented")
			return Mono.just("verification/error")
		}
		if (error != null) {
			model.addAttribute("error", "Upstream login error: ${errorDescription ?: error}")
			return Mono.just("verification/error")
		}

		if (state == null || code == null) {
			model.addAttribute("error", "State and code are both required")
			return Mono.just("verification/error")
		}

		if (!oauthState.containsKey(state)) {
			model.addAttribute("error", "State is unknown")
			return Mono.just("verification/error")
		}
		val identity = oauthState[state]
		if (identity == null) {
			model.addAttribute("error", "State is unknown")
			return Mono.just("verification/error")
		}
		if (identity.csrfToken != null) {
			model.addAttribute("error", "Authorization request already used")
			return Mono.just("verification/error")
		}

		val bodyValues: MultiValueMap<String, String> = LinkedMultiValueMap()
		bodyValues.add("grant_type", "authorization_code")
		bodyValues.add("code", code)
		bodyValues.add("redirect_uri", "${httpConfig.publicPath}api/callback")

		return webClient.post()
			.uri(URI.create(discordConfig.oauthTokenUrl))
			.headers { headers -> headers.setBasicAuth(discordConfig.oauthClientId, discordConfig.oauthClientSecret) }
			.contentType(MediaType.APPLICATION_FORM_URLENCODED)
			.body(BodyInserters.fromFormData(bodyValues))
			.retrieve()
			.bodyToMono(String::class.java)
			.flatMap { token: String -> useToken(token, identity, state, model) }
	}

	private fun useToken(
		token: String,
		identity: AuthIdentity,
		state: String,
		model: Model
	): Mono<String> {
		val accessToken: String = try {
			val root = mapper.readTree(token)
			val errorNode = root["error"]
			if (errorNode != null) {
				val errorDescriptionNode = root["error_description"]
				model.addAttribute("error", "Upstream error when fetching access to token ${
					errorDescriptionNode?.asText() ?: errorNode.asText()	
				}")
				return Mono.just("verification/error")
			}
			root["access_token"].asText()
		} catch (e: IOException) {
			LOGGER.error("Error getting token", e)
			model.addAttribute("error", "An error occurred while fetching access token")
			return Mono.just("verification/error")
		}

		return webClient.get()
			.uri(URI.create(discordConfig.oauthUserInfoUrl))
			.headers { headers -> headers.setBearerAuth(accessToken) }
			.retrieve()
			.toEntity(String::class.java)
			.flatMap { ckeyResponseEntity: ResponseEntity<String?> ->
				val ckey: String = try {
					StringUtils.ckeyIze(mapper.readTree(ckeyResponseEntity.body)["ckey"].asText())
				} catch (e: JsonProcessingException) {
					LOGGER.info("Error processing info response", e)
					model.addAttribute("error", "An error occurred while fetching access token")
					return@flatMap Mono.just("verification/error")
				}
				if (ckey != identity.ckey) {
					model.addAttribute("error","Ckey does not match, you attempted to login using $ckey while the linking process was initialized with ${identity.ckey}")
					return@flatMap Mono.just("verification/error")
				}
				val bytes = ByteArray(32)
				random.nextBytes(bytes)
				identity.csrfToken = StringUtils.bytesToHex(bytes)
				model.addAttribute("discordTag", identity.tag)
				model.addAttribute("discordAvatar", identity.avatar)
				model.addAttribute("state", state)
				model.addAttribute("csrfToken", identity.csrfToken)
				Mono.just("verification/confirm")
			}
	}

	class AuthIdentity(var ckey: String, var snowflake: Snowflake, var avatar: String, var tag: String) {
		var csrfToken: String? = null
	}

	companion object {
		private val LOGGER = LoggerFactory.getLogger(VerificationController::class.java)
	}
}
