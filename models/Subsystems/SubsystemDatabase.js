const Subsystem = require('../Subsystem.js');

class SubsystemDatabase extends Subsystem {
  constructor(manager) {
    super("Database", manager);
    this.priority = 1;

    this.pool = undefined;
  }

  setup(callback) {
    super.setup();

    var sql = require('mysql');
    var config = this.manager.getSubsystem("Config").config;

    this.manager.logger.log("info", "Establishing database connection.");
    this.manager.logger.log("info", "Creating database pool with " + config.sql_connections + " connections.");

    this.pool = sql.createPool({
      connectionLimit: config.sql_connections,
      host: config.sql_host,
      user: config.sql_user,
      password: config.sql_password,
      database: config.sql_database
    });

    this.pool.getConnection((err, connection) => {
      if (err) {
<<<<<<< HEAD
        this.setStatus(3, err);
      }
      else {
        connection.release();

        console.log("Established database connection.");
      }
    });

    this.setStatus(2, "");
=======
        callback(err.sqlMessage);
        return;
      }

      callback();
    });
>>>>>>> 424f203ba5cd017665dd41dad1bf086415ea7f34
  }
}

module.exports = SubsystemDatabase;
