package net.yogstation.yogbot.util

import java.net.URLDecoder
import java.nio.charset.StandardCharsets
import java.util.*
import java.util.AbstractMap.SimpleImmutableEntry
import java.util.stream.Collectors
import kotlin.experimental.and

object StringUtils {
	// Taken from https://stackoverflow.com/a/8155547 then modified
	fun center(s: String, size: Int, pad: Char = ' '): String {
		if (size <= s.length) return s
		val sb = StringBuilder(size)
		sb.append(pad.toString().repeat((size - s.length) / 2))
		sb.append(s)
		while (sb.length < size) {
			sb.append(pad)
		}
		return sb.toString()
	}

	fun padStart(s: String, size: Int, pad: Char = ' '): String {
		return if (size <= s.length) s else pad.toString().repeat(size - s.length) + s
	}

	// Taken from https://stackoverflow.com/a/13592567/2628615
	fun splitQuery(url: String): Map<String, List<String>> {
		return url.split("&")
			.map(StringUtils::splitQueryParameter)
			.stream()
			.collect(Collectors.groupingBy(SimpleImmutableEntry<String, String>::key, ::LinkedHashMap, Collectors.mapping(Map.Entry<String, String>::value, Collectors.toList())))
	}

	private fun splitQueryParameter(it: String): SimpleImmutableEntry<String, String> {
		val idx = it.indexOf("=")
		val key = if (idx > 0) it.substring(0, idx) else it
		val value = if (idx > 0 && it.length > idx + 1) it.substring(idx + 1) else ""
		return SimpleImmutableEntry(
			URLDecoder.decode(key, StandardCharsets.UTF_8),
			URLDecoder.decode(value, StandardCharsets.UTF_8)
		)
	}

	fun ckeyIze(key: String): String {
		return key.lowercase().replace("[^a-z0-9]".toRegex(), "")
	}


	private val HEX_ARRAY = "0123456789ABCDEF".toByteArray(StandardCharsets.US_ASCII)

	// Taken from https://stackoverflow.com/a/9855338
	fun bytesToHex(bytes: ByteArray): String {
		val hexChars = ByteArray(bytes.size * 2)
		for (j in bytes.indices) {
			val b: Int = bytes[j].toInt()
			val v: Int = b.and(0xFF)
			val tmp = v ushr 4
			hexChars[j * 2] = HEX_ARRAY[tmp]
			hexChars[j * 2 + 1] = HEX_ARRAY[v and 0x0F]
		}
		return String(hexChars, StandardCharsets.UTF_8)
	}
}
