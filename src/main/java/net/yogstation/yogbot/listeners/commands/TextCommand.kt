package net.yogstation.yogbot.listeners.commands

import discord4j.common.util.Snowflake
import discord4j.core.`object`.entity.PartialMember
import discord4j.core.`object`.entity.channel.MessageChannel
import discord4j.core.event.domain.message.MessageCreateEvent
import discord4j.core.spec.EmbedCreateSpec
import discord4j.core.spec.MessageCreateSpec
import net.yogstation.yogbot.DatabaseManager
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.listeners.IEventHandler
import net.yogstation.yogbot.util.ByondLinkUtil
import net.yogstation.yogbot.util.StringUtils
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import reactor.core.publisher.Mono

abstract class TextCommand(protected val discordConfig: DiscordConfig) : IEventHandler<MessageCreateEvent> {
	protected val logger: Logger = LoggerFactory.getLogger(javaClass)
	override fun handle(event: MessageCreateEvent): Mono<*> {
		return if (!canFire(event)) doError(event) else doCommand(event)
	}

	protected abstract fun doCommand(event: MessageCreateEvent): Mono<*>
	protected abstract val description: String

	val helpText: String
		get() = String.format("    `%s%s` - %s", discordConfig.commandPrefix, name, description)
	open val isHidden: Boolean
		get() = false

	protected open fun doError(event: MessageCreateEvent): Mono<*> {
		return Mono.empty<Any>()
	}

	protected open fun canFire(event: MessageCreateEvent): Boolean {
		return true
	}

	protected fun getTarget(event: MessageCreateEvent): CommandTarget? {
		val partialMembers: List<PartialMember> = event.message.memberMentions
		if (partialMembers.isNotEmpty()) return CommandTarget.of(partialMembers[0].id)
		val args = event.message.content.split(" ").toTypedArray()
		return if (args.size < 2) null else CommandTarget.of(
			StringUtils.ckeyIze(
				args[1]
			)
		)
	}

	class CommandTarget private constructor(snowflake: Snowflake?, ckey: String?) {
		var snowflake: Snowflake?
			private set
		var ckey: String?
			private set

		init {
			this.snowflake = snowflake
			this.ckey = ckey
		}

		fun populate(database: DatabaseManager): String? {
			val tmpSnowflake = snowflake
			val tmpCkey = ckey
			if (tmpSnowflake == null) {
				if(tmpCkey == null) return "Snowflake and Ckey are both null in CommandTarget::populate"
				val snowflakeResult = ByondLinkUtil.getMemberID(tmpCkey, database)
				if (snowflakeResult.hasError()) return snowflakeResult.error
				snowflake = snowflakeResult.value
			} else if (tmpCkey == null) {
				val ckeyResult = ByondLinkUtil.getCkey(tmpSnowflake, database)
				if (ckeyResult.hasError()) return ckeyResult.error
				ckey = ckeyResult.value
			}
			return null
		}

		companion object {
			fun of(snowflake: Snowflake): CommandTarget {
				return CommandTarget(snowflake, null)
			}

			fun of(ckey: String): CommandTarget {
				return CommandTarget(null, ckey)
			}
		}
	}
}
