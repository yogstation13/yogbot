package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import org.springframework.stereotype.Component
import java.util.*

@Component
class NichlasCommand(discordConfig: DiscordConfig, random: Random) : ImageCommand(discordConfig, random) {
	override val images: List<String> = listOf(
		"https://i.imgur.com/RA0v3cW.jpg",
		"https://i.imgur.com/ugbj0m1.png",
		"https://i.imgur.com/pmgSHjz.png"
	)
	override val title = "Niclas Image"
	override val description = "et-ellerandet et-eller-andet kartoffel"
	override val name = "nichlas"
}
