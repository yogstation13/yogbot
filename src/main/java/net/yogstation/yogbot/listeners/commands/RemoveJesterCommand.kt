package net.yogstation.yogbot.listeners.commands

import discord4j.common.util.Snowflake
import discord4j.core.event.domain.message.MessageCreateEvent
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.util.DiscordUtil
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono

@Component
class RemoveJesterCommand(discordConfig: DiscordConfig) : TextCommand(discordConfig) {
	override fun doCommand(event: MessageCreateEvent): Mono<*> {
		return if (event.member.isEmpty) Mono.empty<Any>() else event.member
			.get()
			.removeRole(Snowflake.of(discordConfig.jesterRole))
			.and(
				DiscordUtil.reply(
					event,
					"Success! But beware if you violate the sacred Jester Oath by daring to ping Jester once again you shall be smited with a thousand YOGGERS!"
				)
			)
	}

	override val description = "Removes the jester role if you have it"
	override val name = "removejester"
}
