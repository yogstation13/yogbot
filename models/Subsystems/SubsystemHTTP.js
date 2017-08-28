var express = require('express');
var bodyparser = require('body-parser');
var pug = require('pug')
var fs = require('fs');

const Subsystem = require('../Subsystem.js');
const UserManager = require('../HTTP/UserManager.js')
const UserPermissionManager = require('../HTTP/UserPermissionsManager.js')
const CaptchaManager = require('../HTTP/RecaptchaManager.js')
const ByondAPI = require("../Byond/ByondAPI.js");


class SubsystemHTTP extends Subsystem {
  constructor(manager) {
    super("HTTP", manager);
    this.priority = 0;

    this.app = express();
    this.userManager = undefined;
    this.UserPermissionManager = undefined;
    this.captchaManager = undefined;
    this.byondAPI = undefined;
  }

  setup() {
    super.setup();

    this.app.set('view engine', 'pug')
    this.app.use(bodyparser.json());

    var config = this.manager.getSubsystem("Config").config;

    this.userManager = new UserManager(this);
    this.userPermissionManager = new UserPermissionManager();
    this.captchaManager = new CaptchaManager(config.captcha_token_private, config.captcha_token_public);

    fs.readdir("./models/HTTP/Routers/", (err, files) => {
      files.forEach(file => {
        console.log(file)
        const RouterClass = require('../HTTP/Routers/' + file);
        var router = new RouterClass(this);
        router.setup();
      });
    });

    this.app.use('/static', express.static('public'))

    this.app.listen(config.http_port);
    console.log('HTTP Server started on port ' + config.http_port);

    this.byondAPI = new ByondAPI(this.manager);

    this.setStatus(2, "");
  }
}

module.exports = SubsystemHTTP;
