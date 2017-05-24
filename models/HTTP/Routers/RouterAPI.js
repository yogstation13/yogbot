const Router = require('../Router.js');

class RouterAPI extends Router {
  constructor(subsystem) {
    super(subsystem, "api")
  }
}

module.exports = RouterAPI;
