package net.yogstation.yogbot

import net.yogstation.yogbot.config.ByondConfig
import net.yogstation.yogbot.util.YogResult
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.nio.ByteOrder
import java.io.IOException
import java.net.Socket
import java.nio.ByteBuffer
import java.nio.charset.StandardCharsets

@Component
class ByondConnector(private val config: ByondConfig) {
	private val logger: Logger = LoggerFactory.getLogger(javaClass)
	fun request(rawQuery: String): YogResult<Any?, String?> {
		val query = String.format("%s&key=%s", rawQuery, config.serverKey)
		val buffer = ByteBuffer.allocate(query.length + 10)
		buffer.put(byteArrayOf(0x00, 0x83.toByte()))
		buffer.putShort((query.length + 6).toShort())
		buffer.put(byteArrayOf(0x00, 0x00, 0x00, 0x00, 0x00))
		buffer.put(query.toByteArray(StandardCharsets.UTF_8))
		buffer.put(0x00.toByte())
		try {
			Socket(config.serverAddress, config.serverPort).use { socket ->
				val outputStream = socket.getOutputStream()
				outputStream.write(buffer.array())
				val inputStream = socket.getInputStream()
				val headerBuffer = ByteArray(4)
				if (inputStream.read(headerBuffer) < 4) return YogResult.error("Returned insufficient data")
				if (headerBuffer[0].toInt() != 0x00 || headerBuffer[1] != 0x83.toByte()) return YogResult.error("Malformed response packet, " + headerBuffer[0] + " " + headerBuffer[1])
				val size = ByteBuffer.wrap(headerBuffer, 2, 2).short
				val bodyBuffer = ByteArray(size.toInt())
				if (inputStream.read(bodyBuffer) < size) return YogResult.error("Returned insufficient data")
				val bb = ByteBuffer.wrap(bodyBuffer)
				val type = bb.get()
				if (type.toInt() == 0x2A) {
					return YogResult.success(bb.order(ByteOrder.LITTLE_ENDIAN).float)
				}
				return if (type.toInt() == 0x06) {
					YogResult.success(StandardCharsets.UTF_8.decode(bb).toString())
				} else YogResult.error("Type is $type")
			}
		} catch (e: IOException) {
			logger.info("Error connecting to byond", e)
			return YogResult.error(e.message)
		}
	}
}
