const RouterPath = require("../../RouterPath.js");

class RouterPathLogin extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);
  }

  register() {
    this.router.get("/library/book/:id", (req, res) => {
      this.get(req, res);
    });
  }

  get(req, res) {

    var options = {
      id: 1,
      showDeleted: false
    }

    if (req.params.id) {
      options.id = req.params.id;
    }

    this.subsystem.byondAPI.libraryManager.fetchBook(options, (err, books) => {
      if (err) {
        return res.send(JSON.stringify({
          "error": err
        }));
      }

      res.send(JSON.stringify(books));
    });

  }
}

module.exports = RouterPathLogin;
