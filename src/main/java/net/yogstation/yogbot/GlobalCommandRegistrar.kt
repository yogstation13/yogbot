package net.yogstation.yogbot

import discord4j.common.JacksonResources
import discord4j.discordjson.json.ApplicationCommandRequest
import discord4j.rest.RestClient
import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.listeners.interactions.IInteractionHandler
import org.slf4j.LoggerFactory
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Component
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStreamReader
import java.util.stream.Collectors

/**
 * Handle the management of discord commands from JSON files
 * Modified to properly handle being packaged into a jar file
 * Original found in the Discord4J examples https://github.com/Discord4J/example-projects/blob/master/gradle-spring-bot/src/main/java/com/novamaday/d4j/gradle/springbot/GlobalCommandRegistrar.java
 */
@Component
class GlobalCommandRegistrar(
	private val restClient: RestClient, private val interactionHandlers: List<IInteractionHandler>,
	private val config: DiscordConfig
) : ApplicationRunner {
	private val logger = LoggerFactory.getLogger(this.javaClass)

	//Since this will only run once on startup, blocking is okay.
	@Throws(IOException::class)
	override fun run(args: ApplicationArguments) {
		val commandsJson: MutableList<String> = ArrayList()
		//The name of the folder the commands json is in, inside our resources folder
		val commandsFolderName = "commands/"
		for (interactionHandler in interactionHandlers) {
			val resourceFileAsString = getResourceFileAsString(commandsFolderName + interactionHandler.uri)
			commandsJson.add(resourceFileAsString)
		}

		//Create an ObjectMapper that supports Discord4J classes
		val d4jMapper = JacksonResources.create()

		// Convenience variables for the sake of easier to read code below
		val applicationService = restClient.applicationService
		val applicationId = restClient.applicationId.block()
		if (applicationId == null) {
			logger.error("Unable to register slash commands, application ID not found.")
			return
		}

		//Get our commands json from resources as command data
		val commands: MutableList<ApplicationCommandRequest> = ArrayList()
		for (json in commandsJson) {
			val request = d4jMapper.objectMapper
				.readValue(json, ApplicationCommandRequest::class.java)
			commands.add(request) //Add to our array list
		}
		if (config.useLocalCommands) {
			logger.info("Loading ${commands.size} guild commands")
			applicationService.bulkOverwriteGuildApplicationCommand(applicationId, config.mainGuildID, commands)
				.doOnNext { logger.debug("Successfully registered guild Commands") }
				.doOnError { e: Throwable? -> logger.error("Failed to register guild commands", e) }
				.subscribe()
			return
		}
		/* Bulk overwrite commands. This is now idempotent, so it is safe to use this even when only 1 command
        is changed/added/removed
        */
		applicationService.bulkOverwriteGlobalApplicationCommand(applicationId, commands)
			.doOnNext { logger.debug("Successfully registered Global Commands") }
			.doOnError { e: Throwable? -> logger.error("Failed to register global commands", e) }
			.subscribe()
	}

	/**
	 * Gets a specific resource file as String
	 *
	 * @param fileName The file path omitting "resources/"
	 * @return The contents of the file as a String, otherwise throws an exception
	 */
	@Throws(IOException::class)
	private fun getResourceFileAsString(fileName: String): String {
		ClassPathResource(fileName).inputStream.use { resourceAsStream ->
			InputStreamReader(resourceAsStream).use { inputStreamReader ->
				BufferedReader(inputStreamReader).use { reader ->
					return reader.lines().collect(
						Collectors.joining(
							System.lineSeparator()
						)
					)
				}
			}
		}
	}
}
