const RouterPath = require("../../RouterPath.js");

class RouterPathLogin extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);
  }

  register() {
    this.router.get("/server/bans/:ckey?/:pageNumber?/:pageLimit?", (req, res) => {
      this.get(req, res);
    });
  }

  get(req, res) {

    var pageNumber = 1;
    var pageLimit = 30;
    var ckey = undefined;

    if (req.params.ckey) {
      if (req.params.ckey != "all") {
        ckey = req.params.ckey;
      }
    }

    if (req.params.pageNumber) {
      pageNumber = req.params.pageNumber;
      console.log(req.params.pageNumber)
    }

    if (req.params.pageLimit) {
      console.log(req.params.pageLimit)
      pageLimit = req.params.pageLimit;
    }

    this.subsystem.byondAPI.banManager.fetchBans(ckey, pageLimit, pageNumber, undefined, (err, bans) => {
      if (err) {
        return res.send(JSON.stringify({
          "error": err
        }));
      }

      res.send(JSON.stringify(bans));
    });

  }

  post(req, res) {

  }
}

module.exports = RouterPathLogin;
