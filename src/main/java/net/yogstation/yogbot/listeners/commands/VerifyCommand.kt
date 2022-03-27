package net.yogstation.yogbot.listeners.commands

import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.config.HttpConfig
import net.yogstation.yogbot.http.VerificationController
import net.yogstation.yogbot.http.VerificationController.AuthIdentity
import net.yogstation.yogbot.util.DiscordUtil
import net.yogstation.yogbot.util.StringUtils
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.security.SecureRandom

@Component
class VerifyCommand(
	discordConfig: DiscordConfig, private val verificationController: VerificationController,
	private val httpConfig: HttpConfig
) : TextCommand(discordConfig) {
	private val random = SecureRandom()
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		if(discordConfig.oauthClientId == "") return DiscordUtil.reply(event, "Verification command is not configured.")
		val args = event.message.content.split(" ")
		if (args.size < 2) return DiscordUtil.reply(event, "Usage: `${args[0]} <ckey>`")
		val ckey = StringUtils.ckeyIze(args.subList(1, args.size).joinToString(""))

		val bytes = ByteArray(8)
		random.nextBytes(bytes)
		val state = StringUtils.bytesToHex(bytes)

		val author = event.message.author
		if (author.isEmpty) return Mono.empty<Any>()
		verificationController.oauthState[state] = AuthIdentity(
			ckey, author.get().id,
			author.get().avatarUrl,
			author.get().tag
		)
		return DiscordUtil.reply(
			event, "Click the following link to complete the linking process: ${httpConfig.publicPath}api/verify?state=$state"
		)
	}

	override val description = "Verifies a connection between a Ckey and a Discord User"
	override val name = "verify"
}
