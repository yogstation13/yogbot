package net.yogstation.yogbot.http.labels

import org.springframework.stereotype.Component

@Component
class DMILabel: GithubLabel() {
	override val label: String = "Sprites"
	override val matchExtensions: List<String> = listOf("dmi")
}
