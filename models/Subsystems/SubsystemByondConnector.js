const Subsystem = require('../Subsystem.js');
const ByondConnector = require('../ByondConnector.js');

class SubsystemByondConnector extends Subsystem {
  constructor(manager) {
    super("Byond Connector", manager);
    this.byondConnector;
    this.roundNumber = "Unknown";
  }

  setup(callback) {
    super.setup(callback);
    var config = this.manager.getSubsystem("Config").config;
    this.byondConnector = new ByondConnector(config.server_host, config.server_port, this.manager);
    callback();
  }
}

module.exports = SubsystemByondConnector;
