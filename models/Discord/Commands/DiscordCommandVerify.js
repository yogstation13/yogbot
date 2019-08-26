const fs = require('fs');
const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandVerify extends DiscordCommand {

  constructor(subsystem) {
    super("verify", "Verifies a connection between a Ckey and a Discord User", undefined, subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;
    if(args.length < 1) {
        message.reply("Usage is " + config.discord_command_character + "verify [ckey]")
        return
    }
    byondConnector.request("?verify=" + encodeURIComponent(message.author.id) + "&ckey=" + encodeURIComponent(args[0]), (results) => {
      if('error' in results) {
        message.channel.send(results.error);
      } else {
        message.reply(results.data.substring(0, results.data.length - 1));
      }
    });
  }

}

module.exports = DiscordCommandVerify;