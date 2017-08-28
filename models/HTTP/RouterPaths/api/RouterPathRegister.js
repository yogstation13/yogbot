const RouterPath = require("../../RouterPath.js");

class RouterPathRegister extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);
  }

  register() {
    this.router.post("/register", (req, res) => {
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

    if (!body.username) {
      res.send({
        error: "Missing username field."
      });
      return;
    }

    if (!body.captcha) {
      res.send({
        error: "Missing captcha field."
      });
      return;
    }

    var email = body.email;
    var password = body.password;
    var username = body.username;

    this.subsystem.captchaManager.verifyCaptcha(body.captcha, (error, success) => {
      if (error) {
        res.send(JSON.stringify({
          error: "Error contacting ReCAPTCHA server."
        }));
        return;
      }

      if (!success) {
        res.send(JSON.stringify({
          component: "recaptcha",
          error: "Invalid recaptcha"
        }));
        return;
      }

      this.subsystem.userManager.registerUser(email, password, username,
        (accept) => {
          res.send(JSON.stringify("Created an account"));
        },
        (error) => {
          res.send(JSON.stringify(error));
        });
    });
  }
}

module.exports = RouterPathRegister;
