const fs = require('fs');
const discordUtil = require('../Discord/DiscordUtils.js');

const Subsystem = require('../Subsystem.js');

class SubsystemConfig extends Subsystem {
  constructor(manager) {
    super("Config", manager);
    this.priority = 2;

    this.config = {};
  }

  setup(callback) {
    super.setup();

    fs.readdir("./config/", (err, files) => {
      if (err) {
        return callback(err);
      }

      files.forEach(file => {
        var configFile = require('../../config/' + file);
        for (var key in configFile) {
          this.config[key] = configFile[key];
        }
      });

      callback();
    });
  }
}

module.exports = SubsystemConfig;
