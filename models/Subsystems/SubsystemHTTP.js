var express = require('express');
var bodyparser = require('body-parser');
var pug = require('pug')
var fs = require('fs');

const Subsystem = require('../Subsystem.js');
const UserManager = require('../HTTP/UserManager.js')
const CaptchaManager = require('../HTTP/RecaptchaManager.js')


class SubsystemHTTP extends Subsystem {
  constructor(manager) {
    super("HTTP", manager);
    this.priority = 0;

    this.app = express();
    this.userManager = undefined;
    this.captchaManager = undefined;
  }

  setup(callback) {
    super.setup();

    this.app.set('view engine', 'pug')

    var config = this.manager.getSubsystem("Config").config;

    this.userManager = new UserManager(this);
    this.captchaManager = new CaptchaManager(config.recaptcha_token);

    fs.readdir("./models/HTTP/Routers/", (err, files) => {
      if (err) {
        return callback(err);
      }

      files.forEach(file => {
        const RouterClass = require('../HTTP/Routers/' + file);
        var router = new RouterClass(this);
        router.setup();
      });

      this.app.use('/static', express.static('public'));

      this.app.listen(config.http_port);

      this.manager.logger.log("info", 'HTTP Server started on port ' + config.http_port);

      callback();
    });
  }
}

module.exports = SubsystemHTTP;
