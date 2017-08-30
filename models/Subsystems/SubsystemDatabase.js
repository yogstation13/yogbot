const Subsystem = require('../Subsystem.js');

class SubsystemDatabase extends Subsystem {
  constructor(manager) {
    super("Database", manager);
    this.priority = 1;

    this.pool = undefined;
  }

  setup() {
    super.setup();

    var sql = require('mysql');
    var config = this.manager.getSubsystem("Config").config;

    console.log("Establishing database connection.");
    console.log("Creating database pool with " + config.sql_connections + " connections.");

    this.pool = sql.createPool({
      connectionLimit: config.sql_connections,
      host: config.sql_host,
      user: config.sql_user,
      password: config.sql_password,
      database: config.sql_database
    });

    this.pool.getConnection((err, connection) => {
      if (err) {
        this.setStatus(3, err);
      }
      else {
        connection.release();

        console.log("Established database connection.");
      }
    });

    this.setStatus(2, "");
  }
}

module.exports = SubsystemDatabase;
