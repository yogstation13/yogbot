const RouterPath = require("../../RouterPath.js");

class RouterPathLogin extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);
  }

  register() {
    this.router.get("/captcha", (req, res) => {
      this.get(req, res);
    });
  }

  get(req, res) {
    var captcha = this.subsystem.manager.getSubsystem("Config").config.captcha_token_public;
    res.send(JSON.stringify(captcha));
  }

  post(req, res) {

  }
}

module.exports = RouterPathLogin;
