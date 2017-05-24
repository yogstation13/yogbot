const RouterPath = require("../../RouterPath.js");

class RouterPathRegister extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router, "/register");
  }

  get(req, res) {
    res.send("Hello World!");
  }

  post(req, res) {
    var body = req.body;

    if (!body.hasOwnProperty("email")) {
      res.status(400).send({ error: "Missing email field."});
      return;
    }

    if (!body.hasOwnProperty("password")) {
      res.status(400).send({ error: "Missing password field."});
      return;
    }

    if (!body.hasOwnProperty("username")) {
      res.status(400).send({ error: "Missing username field."});
      return;
    }

    if (!body.hasOwnProperty("captcha")) {
      res.status(400).send({ error: "Missing captcha field."});
      return;
    }

    var email = body.email;
    var password = body.password;
    var username = body.username;

    this.subsystem.captchaManager.verifyCaptcha(body.captcha, function(error, data) {
      if(error) {
        res.status(503).send({ error: "Error contacting ReCAPTCHA server."});
        return;
      }

      var json = JSON.parse(data);

      if(!json.success) {
        res.status(400).send({ component: "recaptcha", error: "Invalid recaptcha"});
        return;
      }

      this.userManager.registerUser(email, password, username,
      function(error) {
        res.status(400).send(error);
      },
      function(accept) {
        res.status(200).send();
      });
    });
  }
}

module.exports = RouterPathRegister;
