package net.yogstation.yogbot.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding
import org.springframework.boot.context.properties.bind.DefaultValue
import org.springframework.stereotype.Component

@ConstructorBinding
@ConfigurationProperties(prefix = "yogbot.byond")
class ByondConfig {
	var serverKey: String = "no key for you :("
	var serverWebhookKey: String = "webkey"

	var serverAddress: String = "158.69.120.60"
	var serverPort: Int = 4133

	var serverJoinAddress: String = "https://yogstation.net/play.php"
}
