const Subsystem = require('../Subsystem.js');
const {createTopicConnection} = require("http2byond");

class SubsystemByondConnector extends Subsystem {
  /**
   * @type {import('http2byond/typings/types').TopicConnection}
   */
  byondConnector;
  /**
   * @type {string}
   */
  #server_key;

  constructor(manager) {
    super("Byond Connector", manager);
    this.roundNumber = "Unknown";
  }

  setup(callback) {
    super.setup(callback);
    var config = this.manager.getSubsystem("Config").config;
    this.createConnection();
    this.#server_key = config.server_key
    callback();
  }

  createConnection() {
    var config = this.manager.getSubsystem("Config").config;
    this.byondConnector = createTopicConnection({
      host: config.server_host,
      port: config.server_port
    })
  }

  /**
   * Send a topic to the game server
   * @param topic {string}
   * @returns {Promise<import('http2byond/typings/types').TopicReturnType>}
   */
  request(topic) {
    return this.byondConnector.send(topic + "&key=" + this.#server_key).catch(e => {
      this.createConnection();
      throw e;
    })
  }


}

module.exports = SubsystemByondConnector;
