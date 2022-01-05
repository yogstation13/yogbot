const Subsystem = require('../Subsystem.js');

class SubsystemDatabase extends Subsystem {
  constructor(manager) {
    super("Database", manager);
    this.priority = 1;

    this.pool = undefined;
  }

  setup(callback) {
    super.setup(callback);

    var sql = require('mysql');
    var config = this.manager.getSubsystem("Config").config;

    this.manager.logger.log("info", "Establishing database connection.");
    this.manager.logger.log("info", "Creating database pool with " + config.sql_connections + " connections.");



    this.pool = sql.createPool({
      connectionLimit: config.sql_connections,
      host: config.sql_host,
      port: config.sql_port,
      user: config.sql_user,
      password: config.sql_password,
      database: config.sql_database,
      supportBigNumbers: true
    });

    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err.sqlMessage);
        return;
      }

      callback();
    });
  }

  format_table_name(base_name) {
    var config = this.manager.getSubsystem("Config").config;
    return config.sql_prefix + base_name
  }
}

module.exports = SubsystemDatabase;
