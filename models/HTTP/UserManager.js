const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserManager {
  constructor(subsystem) {
    this.subsystem = subsystem;

    //By keeping a list of tokens generated we can revoke tokens whenever we like
    this.authorizedTokens = [];
  }

  registerUser(email, password, username, accept, reject) {
    if (typeof accept !== "function") {
      return;
    }

    if (typeof reject !== "function") {
      return;
    }

    var stringUtils = require('../Utils/String.js');

    if (!stringUtils.validateEmail(email)) {
      reject({
        component: "email",
        error: "That's an invalid email."
      });
      return;
    }

    var config = this.subsystem.manager.getSubsystem("Config").config;

    if (username.length < config.http_minimum_username_length) {
      return reject({
        component: "username",
        error: "Username needs to be atleast " + config.http_minimum_username_length + " characters long."
      });
    }

    if (username.length > config.http_maximum_username_length) {
      return reject({
        component: "username",
        error: "Username needs to be less than " + config.http_maximum_username_length + " characters long."
      });
    }

    if (password.length < config.http_minimum_password_length) {
      return reject({
        component: "password",
        error: "Password needs to be atleast " + config.http_minimum_password_length + " characters long."
      });
    }

    if (password.length > config.http_maximum_password_length) {
      return reject({
        component: "password",
        error: "Password needs to be less than " + config.http_maximum_password_length + " characters long."
      });
    }

    var linkPool = this.subsystem.manager.getSubsystem("Database").pool;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        linkPool.getConnection((error, connection) => {
          if (err) {
            reject({
              component: undefined,
              error: "There was an error contacting the database, try again later."
            });
            connection.release();
            return;
          }

          connection.query('SELECT `id` FROM `web_users` WHERE `email` = ? OR `user` = ?', [email, username], (err, results, fields) => {

            if (err) {
              connection.release();
              return reject({
                component: undefined,
                error: "There was an error running a query: " + err
              });
            }

            if (results.length > 0) {
              connection.release();
              return reject({
                component: "email",
                error: "User Or Email already exists."
              });
            }

            connection.query("INSERT INTO `web_users` (`email`, `password`, `user`) VALUES (?, ?, ?)", [email, hash, username], (err, results, fields) => {
              if (err) {
                connection.release();
                return reject({
                  component: undefined,
                  error: "There was an error running a query: " + err
                });
              }

              accept();
              connection.release();
            });
          });
        });
      });
    });

  }

  authenticateUser(email, password, callback) {

    if (!email) {
      callback({
        component: "email",
        error: "No email submitted."
      }, undefined);
    }

    if (!password) {
      callback({
        component: "password",
        error: "No password submitted."
      }, undefined);
    }

    var stringUtils = require('../Utils/String.js');

    if (!stringUtils.validateEmail(email)) {
      callback({
        component: "email",
        error: "That's an invalid email."
      }, undefined);
      return;
    }

    var config = this.subsystem.manager.getSubsystem("Config").config;
    var linkPool = this.subsystem.manager.getSubsystem("Database").pool;

    linkPool.getConnection((error, connection) => {
      connection.query("SELECT * FROM `web_users` WHERE `email` = ?", [email], (err, results, fields) => {
        connection.release();

        if (err) {
          var error = {
            component: "server",
            error: err
          }

          return callback(error, undefined);
        }

        var row = results[0];

        bcrypt.compare(password, row.password, (err, res) => {

          if (err) {
            var error = {
              component: "server",
              error: err
            }

            return callback(error, undefined);
          }

          if (!res) {
            var error = {
              component: "email",
              error: "Invalid email and password combination."
            }

            return callback(error, undefined);
          }

          var config = this.subsystem.manager.getSubsystem("Config").config;

          var permissions = this.subsystem.userPermissionManager.getGroupPermissions(row.group);

          var payload = {
            id: row.id,
            user: row.user,
            permissions: permissions,
            verified: row.verified
          }

          var options = {
            algorithm: 'HS256',
            expiresIn: '1d'
          }

          jwt.sign(payload, config.http_jwt_private, options, (err, token) => {
            if (err) {
              var error = {
                component: "server",
                error: err
              }

              return callback(error, undefined);
            }

            this.tokens += token;

            callback(undefined, token);
          });
        });
      });
    });

  }
}

module.exports = UserManager;
