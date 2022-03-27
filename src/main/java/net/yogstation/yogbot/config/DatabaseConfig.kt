package net.yogstation.yogbot.config

import org.springframework.stereotype.Component

@Component
class DatabaseConfig {
	// Connection Info, default matches the game server's default
	var hostname: String = "localhost"
	var port: Int = 3306
	var byondDatabase: String = "feedback"
	var yogbotDatabase: String = "yogbot"
	var username: String = "username"
	var password: String = "password"

	var prefix: String = "SS13_"
}
