package net.yogstation.yogbot.http.labels

import org.springframework.stereotype.Component

@Component
class SoundLabel: GithubLabel() {
	override val label: String = "Sound"
	override val changelogTypes: List<String> = listOf("ogg")
}
