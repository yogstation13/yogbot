package net.yogstation.yogbot.listeners.channel

import discord4j.common.util.Snowflake
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.ByondConnector
import net.yogstation.yogbot.config.DiscordChannelsConfig
import org.apache.commons.text.StringEscapeUtils
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

@Component
class OOCChannel(channelsConfig: DiscordChannelsConfig, byondConnector: ByondConnector) : RelayChannel (
	channelsConfig, byondConnector
) {
	override val channel: Snowflake = Snowflake.of(channelsConfig.channelOOC)
	override val method: String = "ooc"
}
