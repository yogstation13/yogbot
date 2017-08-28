const RouterPath = require("../../RouterPath.js");

class RouterPathLogin extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);
  }

  register() {
    this.router.get("/library/books/:category?/:page?/:limit?", (req, res) => {
      this.get(req, res);
    });
  }

  get(req, res) {

    var options = {
      category: "all",
      page: 1,
      limit: 30,
      order: "last",
      showDeleted: false
    }

    if (req.params.category) {
      options.category = req.params.category;
    }

    if (req.params.page) {
      options.page = req.params.page;
    }

    if (req.params.limit) {
      options.limit = req.params.limit;
    }

    this.subsystem.byondAPI.libraryManager.fetchBooks(options, (err, books) => {
      if (err) {
        return res.send(JSON.stringify({
          "error": err
        }));
      }

      res.send(JSON.stringify(books));
    });

  }

  post(req, res) {

  }
}

module.exports = RouterPathLogin;
