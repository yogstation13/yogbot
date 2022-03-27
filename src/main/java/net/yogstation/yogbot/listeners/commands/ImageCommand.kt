package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import discord4j.core.event.domain.message.MessageCreateEvent
import reactor.core.publisher.Mono
import discord4j.core.spec.EmbedCreateSpec
import discord4j.rest.util.Color
import net.yogstation.yogbot.util.DiscordUtil
import java.util.*

abstract class ImageCommand(discordConfig: DiscordConfig, protected val random: Random) : TextCommand(
	discordConfig
) {
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		val urls = images
		val url = urls[random.nextInt(urls.size)]
		val embed = EmbedCreateSpec.builder()
			.color(Color.of(random.nextInt(0xFFFFFF)))
			.title(title)
			.image(url)
			.footer(url, "")
			.build()
		return DiscordUtil.reply(event, embed)
	}

	protected abstract val images: List<String>
	protected abstract val title: String
	override val isHidden = true
}
