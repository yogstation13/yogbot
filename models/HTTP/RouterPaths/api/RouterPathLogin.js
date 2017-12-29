const RouterPath = require("../../RouterPath.js");

class RouterPathLogin extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);
  }

  register() {
    this.router.post("/login", (req, res) => {
      this.post(req, res);
    });
  }

  post(req, res) {
    var body = req.body;

    if (!body.email) {
      res.send({
        error: "Missing email field."
      });
      return;
    }


    if (!body.password) {
      res.send({
        error: "Missing password field."
      });
      return;
    }

    this.subsystem.userManager.authenticateUser(body.email, body.password, (err, generatedToken) => {
      if (err) {
        res.send(err);
        return;
      }

      res.send({
        token: generatedToken
      });
    });
  }
}

module.exports = RouterPathLogin;
