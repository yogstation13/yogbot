package net.yogstation.yogbot.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding
import org.springframework.stereotype.Component

@ConstructorBinding
@ConfigurationProperties(prefix = "yogbot.http")
class HttpConfig {
	var publicPath: String = "https://yogbot.yogstation.net/"

}
