package net.yogstation.yogbot.http.labels

import org.springframework.stereotype.Component

@Component
class DeletionLabel: GithubLabel() {
	override val label: String = "Revert / Deletion"
	override val changelogTypes: List<String> = listOf("rscdel")
}
