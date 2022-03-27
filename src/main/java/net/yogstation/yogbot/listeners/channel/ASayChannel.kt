package net.yogstation.yogbot.listeners.channel

import net.yogstation.yogbot.config.DiscordChannelsConfig
import net.yogstation.yogbot.ByondConnector
import discord4j.common.util.Snowflake
import discord4j.core.event.domain.message.MessageCreateEvent
import reactor.core.publisher.Mono
import java.lang.StringBuilder
import org.apache.commons.text.StringEscapeUtils
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.net.URLEncoder
import java.nio.charset.StandardCharsets
import java.util.function.Consumer

@Component
class ASayChannel(channelsConfig: DiscordChannelsConfig, byondConnector: ByondConnector) : RelayChannel (
	channelsConfig, byondConnector
) {
	override val channel: Snowflake = Snowflake.of(channelsConfig.channelAsay)
	override val method: String = "asay"
	override val imagesAllowed = true
}
