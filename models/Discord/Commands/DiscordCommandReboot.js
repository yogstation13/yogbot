const DiscordCommand = require('../DiscordCommand.js');
const spawn = require('child_process').spawn;

class DiscordCommandReboot extends DiscordCommand {

  constructor(subsystem) {
    super("reboot", "Reboot the server.", 'reboot', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if(args.length < 1) {
      message.reply("Available reboot commands: \n     `" + config.discord_command_character + "reboot hard` Kills the server daemon and starts a new daemon. \n     `" + config.discord_command_character + "reboot soft` tells the server daemon to restart. \n     `" + config.discord_command_character + "reboot bot` tells the bot daemon to restart and update.");
      return;
    }

    var rebootOption = args[0];

    switch (rebootOption) {
      case 'hard':
        var taskkill = spawn('taskkill', ['/F', '/IM', 'dreamdaemon.exe']);
        taskkill.on('exit', (code) => {
          message.reply("Hard reboot exited with exit code: " + code);
        });
        break;
      case 'soft':
        var request = "?reboot&key=" + config.server_key;
        byondConnector.request(request, function(results) {
          if('error' in results) {
            message.reply(results.error);
          } else {
            message.reply(results.data);
          }
        });
        break;
      case 'bot':
        message.reply("Updating & Rebooting Bot.").then(() => {
          this.subsystem.manager.getSubsystem("Updater").update((data) => {
            message.reply(data);
          });
        });
        break;
      default:
        message.reply("Use either the `hard`, `soft` or `bot` option");
        break;

    }
  }

}

module.exports = DiscordCommandReboot;
