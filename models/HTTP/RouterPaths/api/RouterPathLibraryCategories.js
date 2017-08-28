const RouterPath = require("../../RouterPath.js");

class RouterPathLogin extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);
  }

  register() {
    this.router.get("/library/categories", (req, res) => {
      this.get(req, res);
    });
  }

  get(req, res) {

    this.subsystem.byondAPI.libraryManager.fetchAvailableCategories((err, categories) => {
      if (err) {
        return res.send(JSON.stringify({
          "error": err
        }));
      }

      res.send(JSON.stringify(categories));
    });

  }

  post(req, res) {

  }
}

module.exports = RouterPathLogin;
