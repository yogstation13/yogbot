const fs = require('fs');
const discordUtil = require('../Discord/DiscordUtils.js');

const Subsystem = require('../Subsystem.js');

class SubsystemConfig extends Subsystem {
  constructor(manager) {
    super("Config", manager);
    this.priority = 2;

    this.config = {};
  }

  setup() {
    super.setup();

    var files = fs.readdirSync("./config/");

    files.forEach(file => {
      var configFile = require('../../config/' + file);
      for (var key in configFile) {
        this.config[key] = configFile[key];
      }
    });

    this.setStatus(2, "");
  }
}

module.exports = SubsystemConfig;
