package net.yogstation.yogbot.util

class YogResult<T, E> private constructor(val value: T?, val error: E?) {

	fun hasError(): Boolean {
		return error != null
	}

	fun hasValue(): Boolean {
		return value != null
	}

	companion object {

		fun <T, E> success(success: T): YogResult<T, E?> {
			return YogResult(success, null)
		}

		fun <T, E> error(error: E): YogResult<T?, E> {
			return YogResult(null, error)
		}
	}
}
