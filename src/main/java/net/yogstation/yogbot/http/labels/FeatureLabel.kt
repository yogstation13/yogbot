package net.yogstation.yogbot.http.labels

import org.springframework.stereotype.Component

@Component
class FeatureLabel: GithubLabel() {
	override val label: String = "Feature"
	override val changelogTypes: List<String> = listOf("rscadd")
}
