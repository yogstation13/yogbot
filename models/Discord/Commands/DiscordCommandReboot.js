const DiscordCommand = require('../DiscordCommand.js');
const https = require('https');

class DiscordCommandReboot extends DiscordCommand {

  constructor(subsystem) {
    super("reboot", "Reboot the bot.", 'reboot', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if (args.length < 1) {
      message.reply("Available reboot commands: \n     `" + config.discord_command_character + "reboot hard` Kills the server daemon and starts a new daemon. \n     `" + config.discord_command_character + "reboot soft` tells the server daemon to restart. \n     `" + config.discord_command_character + "reboot bot` tells the bot daemon to restart and update.");
      return;
    }

    var rebootOption = args[0];
    this.subsystem.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") tried to reboot the server with the " + rebootOption + " reboot option.");

    switch (rebootOption) {
    case 'hard':
        message.reply('<@&134720989593337856> <@&370686425194037248> - Staff are kindly requesting you assist in rebooting the server.');
      break;
    case 'soft':
      var request = "?reboot";
      byondConnector.request(request, (results) => {
        if ('error' in results) {
          message.channel.send(results.error);
        }
        else {
          message.channel.send(results.data);
        }
      });
      break;
    case 'bot':
      message.reply("Updating & Rebooting Bot.").then(() => {
        process.exit(0);
      });
      break;
    default:
      message.reply("Use either the `hard`, `soft` or `bot` option");
      break;

    }
  }

}

module.exports = DiscordCommandReboot;
