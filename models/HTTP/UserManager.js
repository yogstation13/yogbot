var bcrypt = require('bcrypt');

class UserManager {
  constructor(subsystem) {
    this.subsystem = subsystem;
  }

  registerUser(email, password, username, accept, reject) {
    if(typeof accept !== "function") {
      return;
    }

    if(typeof reject !== "function") {
      return;
    }

    var stringUtils = require('../Utils/String.js');

    if(!stringUtils.validateEmail(email)) {
      reject({ component: "email", error: "That's an invalid email."});
      return;
    }

    var config = this.subsystem.manager.getSubsystem("Config").config;

    if(username.length < config.http_minimum_username_length) {
      return reject({ component: "username", error: "Username needs to be atleast " + config.http_minimum_username_length + " characters long."});
    }

    if(username.length > config.http_maximum_username_length) {
      return reject({ component: "username", error: "Username needs to be less than " + config.http_maximum_username_length + " characters long."});
    }

    if(password.length < config.http_minimum_password_length) {
      return reject({ component: "password", error: "Password needs to be atleast " + config.http_minimum_password_length + " characters long."});
    }

    if(password.length > config.http_maximum_password_length) {
      return reject({ component: "password", error: "Password needs to be less than " + config.http_maximum_password_length + " characters long."});
    }

    var linkPool = this.subsystem.manager.getSubsystem("Database").pool;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          linkPool.getConnection(function(error, connection) {
            if(err) {
              reject({ component: undefined, error: "There was an error contacting the database, try again later."});
              connection.release();
              return;
            }

            connection.query('SELECT `id` FROM `web_users` WHERE `email` = ? OR `user` = ?', [email, username] , function (err, results, fields) {

              if(err) {
                connection.release();
                return reject({ component: undefined, error: "There was an error running a query: " + err});
              }

              if(results.length > 0) {
                connection.release();
                return reject({ component: "email", error: "User Or Email already exists."});
              }

              connection.query("INSERT INTO `web_users` (`email`, `password`, `user`) VALUES (?, ?, ?)", [email, hash, username], function(err, results, fields) {
                if(err) {
                  connection.release();
                  return reject({ component: undefined, error: "There was an error running a query: " + err});
                }

                accept();
                connection.release();
              });
            });
          });
        });
    });

  }
}

module.exports = UserManager;
