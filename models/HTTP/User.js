var bcrypt = require('bcryptjs');

class User {

  constructor(options) {

  }

  static authenticate(email, password, subsystemManager, accept) {
    subsystemManager.getSubsystem("Database").pool.getConnection((err, connection) => {
      if(err) {
        accept("Database connection failed.", undefined);
        return;
      }

      connection.query("SELECT * FROM `web_users` WHERE `email` = ?", [email], (err, reesults, fields) => {
        if(err) {
          accept("Error running database query.", undefined);
          connection.release();
          return;
        }


      });
    });
  }
}

module.exports = User;
