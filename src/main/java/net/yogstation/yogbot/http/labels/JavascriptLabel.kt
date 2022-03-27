package net.yogstation.yogbot.http.labels

import org.springframework.stereotype.Component

@Component
class JavascriptLabel: GithubLabel() {
	override val label: String = "Javascript"
	override val matchExtensions: List<String> = listOf("js")
}
