package net.yogstation.yogbot.http.labels

import org.springframework.stereotype.Component

@Component
class FixLabel: GithubLabel() {
	override val label: String = "Fix"
	override val changelogTypes: List<String> = listOf("fix", "fixes", "bugfix")
}
