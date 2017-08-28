const RouterPath = require("../../RouterPath.js");
const ByondAPI = require("../../../Byond/ByondAPI.js");
const bodyParser = require('body-parser');


class RouterPathByond extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);

    this.byondAPI = new ByondAPI(subsystem.manager);
    this.router.get("/byond", bodyParser.json(), (req, res) => {
      this.get(req, res);
    });
  }

  get(req, res) {
    if (req.query.data === undefined) {
      var error = {
        response: "No `data` query.",
        status: 400
      };

      return res.status(400).send(JSON.stringify(error));
    }

    if (req.query.method === undefined) {
      var error = {
        response: "No `method` query.",
        status: 400
      };

      return res.status(400).send(JSON.stringify(error));
    }

    if (req.query.key === undefined) {
      var error = {
        response: "No `key` query.",
        status: 400
      };

      return res.status(400).send(JSON.stringify(error));
    }

    var config = this.subsystem.manager.getSubsystem("Config").config;

    if (req.query.key === config.server_webhook_key) {
      var data;

      try {
        data = JSON.parse(req.query.data);
      }
      catch (e) {
        var error = {
          response: "Error parsing json.",
          status: 400
        };

        return res.send(JSON.stringify(error));
      }

      this.subsystem.byondAPI.request(req.query.method, data, (err, data) => {
        if (err) {
          return res.status(err.status).send(JSON.stringify(err));
        }

        res.send(JSON.stringify(data));
      });
    }
    else {
      var error = {
        response: "Invalid key.",
        status: 401
      };

      return res.status(401).send(JSON.stringify(error));
    }
  }
}

module.exports = RouterPathByond;
