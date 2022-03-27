package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import org.springframework.stereotype.Component
import java.util.*

@Component
class KMCCommand(discordConfig: DiscordConfig, random: Random) : ImageCommand(discordConfig, random) {
	override val images: List<String> = listOf(
		"https://cdn.discordapp.com/attachments/300800158260658177/313801305271566337/images26.jpg",
		"https://cdn.discordapp.com/attachments/300800158260658177/313801304520523776/images5.png",
		"https://cdn.discordapp.com/attachments/300800158260658177/313801304449351680/images6.png",
		"https://cdn.discordapp.com/attachments/300800158260658177/313801383059128322/yeezy-boost-350-v2-hbx-restock-1.jpg",
		"https://cdn.discordapp.com/attachments/300800158260658177/313801382568132611/adidas-Yeezy-Boost-350-v2-.jpg"
	)
	override val title = "KMC Image"
	override val description = "Pictures of event organizers"
	override val name = "kmc"
}
