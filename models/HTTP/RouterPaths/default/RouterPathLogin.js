const RouterPath = require("../../RouterPath.js");

class RouterPathLogin extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router, "/login");
  }

  get(req, res) {
    res.render("login", { title: "Test"});
  }

  post(req, res) {

  }
}

module.exports = RouterPathLogin;
