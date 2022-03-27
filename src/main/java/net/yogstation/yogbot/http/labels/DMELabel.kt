package net.yogstation.yogbot.http.labels

import org.springframework.stereotype.Component

@Component
class DMELabel: GithubLabel() {
	override val label: String = "DME Edit"
	override val matchExtensions: List<String> = listOf("dme")
}
