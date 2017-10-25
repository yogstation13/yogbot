var express = require('express');
var fs = require('fs');

class Router {
  constructor(subsystem, routerPath) {
    this.subsystem = subsystem;
    this.routerPath = routerPath;

    this.router = express.Router();
  }

  setup() {

    var routerName = "default"

    if (this.routerPath !== "") {
      routerName = this.routerPath;
    }

    this.subsystem.manager.logger.log("info", "Loaded HTTP Router: " + routerName);

    var files = fs.readdirSync("./models/HTTP/RouterPaths/" + routerName + "/");

    for (var file in files) {
      const RouterPathClass = require('../HTTP/RouterPaths/' + routerName + "/" + files[file]);
      var routerPath = new RouterPathClass(this.subsystem, this.router);
      routerPath.register();
    }

    this.subsystem.app.use("/" + this.routerPath, this.router);
  }
}

module.exports = Router;
