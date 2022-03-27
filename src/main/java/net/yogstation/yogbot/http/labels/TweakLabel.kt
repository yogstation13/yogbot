package net.yogstation.yogbot.http.labels

import org.springframework.stereotype.Component

@Component
class TweakLabel: GithubLabel() {
	override val label: String = "Tweak"
	override val changelogTypes: List<String> = listOf("tweak")
}
