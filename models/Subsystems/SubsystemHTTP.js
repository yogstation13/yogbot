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

    // TODO: Add healthcheck endpoint.

  }
}

module.exports = SubsystemHTTP;
