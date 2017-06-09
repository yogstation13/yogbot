const Router = require('../Router.js');

class RouterStats extends Router {
  constructor(subsystem) {
    super(subsystem, "stats")
  }
}

module.exports = RouterStats;
