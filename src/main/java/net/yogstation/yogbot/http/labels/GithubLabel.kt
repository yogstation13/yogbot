package net.yogstation.yogbot.http.labels

import com.fasterxml.jackson.databind.JsonNode
import net.yogstation.yogbot.http.GithubController

abstract class GithubLabel {
	abstract val label: String
	protected open val changelogTypes: List<String> = listOf()
	protected open val matchExtensions: List<String> = listOf()

	protected open fun isMatch(eventData: JsonNode): Boolean {
		return true
	}

	protected open fun isMatch(changelog: GithubController.Changelog?): Boolean {
		return changelogTypes.isEmpty() || changelog != null && changelogTypes.any { tag ->
			changelog.entries.any {
				it.type == tag
			}
		}
	}

	protected open fun isMatch(extensions: Set<String>): Boolean {
		return matchExtensions.isEmpty() || matchExtensions.any {
			extensions.contains(it)
		}
	}

	fun isMatch(eventData: JsonNode, changelog: GithubController.Changelog?, extensions: Set<String>): Boolean {
		return isMatch(eventData) && isMatch(changelog) && isMatch(extensions)
	}
}
