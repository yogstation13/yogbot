const RouterPath = require("../../RouterPath.js");

class RouterPathLogin extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);
  }

  register() {
    this.router.get("/server", (req, res) => {
      this.get(req, res);
    });
  }

  get(req, res) {
    res.send(JSON.stringify(this.subsystem.byondAPI.serverStatus));
  }

  post(req, res) {

  }
}

module.exports = RouterPathLogin;
