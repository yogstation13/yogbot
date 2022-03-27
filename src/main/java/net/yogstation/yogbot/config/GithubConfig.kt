package net.yogstation.yogbot.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties(prefix = "yogbot.github")
class GithubConfig {
	var hmac = ""
	var token = ""
	var repoLink = "https://api.github.com/repos/yogstation13/Yogstation"
}
