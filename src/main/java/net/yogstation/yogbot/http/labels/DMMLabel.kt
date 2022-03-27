package net.yogstation.yogbot.http.labels

import org.springframework.stereotype.Component

@Component
class DMMLabel: GithubLabel() {
	override val label: String = "Map Change"
	override val matchExtensions: List<String> = listOf("dmm")
}
