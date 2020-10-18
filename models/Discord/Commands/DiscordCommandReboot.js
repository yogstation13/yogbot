const DiscordCommand = require('../DiscordCommand.js');
const https = require('https');

class DiscordCommandReboot extends DiscordCommand {

  constructor(subsystem) {
    super("reboot", "Reboot the bot.", 'reboot', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if (args.length < 1) {
      message.reply("Available reboot commands: \n     `" + config.discord_command_character + "reboot soft` tells the server daemon to restart. \n     `");
      return;
    }

    var rebootOption = args[0];
    this.subsystem.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") tried to reboot the server with the " + rebootOption + " reboot option.");

    switch (rebootOption) {
    case 'soft':
      var request = "?reboot";
      this.subsystem.manager.getSubsystem("Byond Connector").byondConnector.request(request, (results) => {
        if ('error' in results) {
          message.channel.send(results.error);
        }
        else {
          message.channel.send(results.data);
        }
      });
      break;
    default:
      message.reply("Use the `soft` option");
      break;

    }
  }

}

module.exports = DiscordCommandReboot;
