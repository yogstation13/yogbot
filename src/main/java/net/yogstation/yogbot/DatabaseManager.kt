package net.yogstation.yogbot

import net.yogstation.yogbot.config.DatabaseConfig
import com.mysql.cj.jdbc.MysqlConnectionPoolDataSource
import org.springframework.stereotype.Component
import java.sql.Connection
import kotlin.Throws
import java.sql.SQLException

@Component
class DatabaseManager(private val config: DatabaseConfig) {
	private val byondDbDs: MysqlConnectionPoolDataSource = MysqlConnectionPoolDataSource()
	val yogbotDbDs: MysqlConnectionPoolDataSource = MysqlConnectionPoolDataSource()

	init {
		byondDbDs.serverName = config.hostname
		byondDbDs.port = config.port
		byondDbDs.databaseName = config.byondDatabase
		byondDbDs.user = config.username
		byondDbDs.password = config.password

		yogbotDbDs.serverName = config.hostname
		yogbotDbDs.port = config.port
		yogbotDbDs.databaseName = config.yogbotDatabase
		yogbotDbDs.user = config.username
		yogbotDbDs.password = config.password
	}

	fun prefix(tableName: String): String {
		return config.prefix + tableName
	}

	@get:Throws(SQLException::class)
	val byondDbConnection: Connection
		get() = byondDbDs.connection

	@get:Throws(SQLException::class)
	val yogbotDbConnection: Connection
		get() = yogbotDbDs.connection
}
