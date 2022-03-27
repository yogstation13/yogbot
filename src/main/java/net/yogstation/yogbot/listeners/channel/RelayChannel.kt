package net.yogstation.yogbot.listeners.channel

import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.ByondConnector
import discord4j.core.event.domain.message.MessageCreateEvent
import reactor.core.publisher.Mono
import java.lang.StringBuilder
import org.apache.commons.text.StringEscapeUtils
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

@Component
abstract class RelayChannel(channelsConfig: DiscordChannelsConfig, private val byondConnector: ByondConnector) : AbstractChannel(
	channelsConfig
) {
	private val logger = LoggerFactory.getLogger(javaClass)
	open val imagesAllowed = false
	abstract val method: String

	override fun handle(event: MessageCreateEvent): Mono<*> {
		if (event.message.author.isEmpty) return Mono.empty<Any>()
		val messageBuilder = StringBuilder(
			StringEscapeUtils.escapeHtml4(event.message.content)
		)
		if(imagesAllowed) {
			event.message.attachments.forEach { attachment ->
				logger.info("Attachment {} found", attachment.filename)
				if (attachment.filename.endsWith(".jpg") || attachment.filename.endsWith(".png")) {
					messageBuilder.append("<br><img src=\"").append(attachment.url).append("\" alt=\"Image\">")
				}
			}
		}
		val user: String = if (event.member.isPresent) {
			event.member.get().displayName
		} else {
			event.message.author.get().username
		}
		byondConnector.request(
			"?$method=${URLEncoder.encode(messageBuilder.toString(), StandardCharsets.UTF_8)}&admin=${
				URLEncoder.encode(
					user,
					StandardCharsets.UTF_8
				)
			}"
		)
		return Mono.empty<Any>()
	}
}
