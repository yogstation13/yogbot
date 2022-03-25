const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandPing extends DiscordCommand {

  constructor(subsystem) {
    super("ping", "Pings the server.", 'ping', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;

    this.subsystem.manager.getSubsystem("Byond Connector").request("?ping")
      .then(ping => {
        message.reply("There are **" + ping + "** players online, join them now with " + config.server_join_address);
      })
      .catch(message.channel.send)
  }

}

module.exports = DiscordCommandPing;
