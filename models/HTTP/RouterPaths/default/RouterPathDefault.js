const RouterPath = require("../../RouterPath.js");
const express = require('express');
const path = require('path');

class RouterPathDefault extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);
  }

  register() {
    this.subsystem.app.use("/", express.static("public"));
    this.router.get('/*', function (req, res) {
      res.sendFile(path.dirname(require.main.filename) + '/public/index.html');
    });
  }

  get(req, res) {

  }
}

module.exports = RouterPathDefault;
