const RouterPath = require("../../RouterPath.js");

class RouterPathFrontpage extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router, "");
  }

  get(req, res) {
    res.send(":^)");
  }

  post(req, res) {

  }
}

module.exports = RouterPathFrontpage;
