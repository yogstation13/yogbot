package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.listeners.commands.ImageCommand
import org.springframework.stereotype.Component
import java.util.*

@Component
class HardyCommand(discordConfig: DiscordConfig, random: Random) : ImageCommand(discordConfig, random) {
	override val images = listOf(
			"https://www.seanconway.com/uploads/1/3/2/4/13241475/3193657_orig.jpg",
			"https://ilovefancydress.com/image/cache/data/7/Penguin%20Fat%20Suit%20Costume-900x900.jpg"
		)
	override val title = "Hardy Image"
	override val name = "hardy"
	override val description = "Pictures of our overlord"
}
