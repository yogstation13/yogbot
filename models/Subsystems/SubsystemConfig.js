var fs = require('fs');
var discordUtil = require('../Discord/DiscordUtils.js');

const Subsystem = require('../Subsystem.js');

class SubsystemConfig extends Subsystem {
  constructor(manager) {
    super("Config", manager);
    this.priority = 2;

    this.config = require("../../config/config.json");
  }

  setup() {
    super.setup();
    this.setStatus(2, "");

  }

  setConfig(index, value) {

    if (typeof value === 'string') {
      var discordID = discordUtil.stringToDiscordID(value);

      if (discordID) {
        value = discordID;
      }
    }

    /*if(typeof this.config[index] === 'undefined') {
      return false;
    }*/
    this.config[index] = value;
    this.save();
    return true;
  }

  save() {
    fs.writeFile('./config/config.json', JSON.stringify(this.config, null, 4), 'utf8', (error) => {
      if (error) {
        console.log(error);
      }
      console.log("Saved config file.")
    });
  }
}

module.exports = SubsystemConfig;
