package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import org.springframework.stereotype.Component
import java.util.*

@Component
class AshCommand(discordConfig: DiscordConfig, random: Random) : ImageCommand(discordConfig, random) {
	override val images: List<String> = listOf(
			"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Einstein-formal_portrait-35.jpg/220px-Einstein-formal_portrait-35.jpg",
			"https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg"
		)
	override val title = "Ash Image"
	override val name = "ash"
	override val description = "Pictures of our friendly neighbourhood onion"
}
