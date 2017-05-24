const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandReboot extends DiscordCommand {

  constructor(subsystem) {
    super("reboot", "Reboot the server.", 'reboot', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if(args.length < 1) {
      message.reply("Available reboot commands: \n     `" + config.discord_command_character + "reboot hard` Kills the server daemon and starts a new daemon. \n     `" + config.discord_command_character + "!reboot soft` tells the server daemon to restart.");
      return;
    }

    var rebootOption = args[0];

    switch (rebootOption) {
      case 'hard':
        //kill daeon
        break;
      default:

    }
  }

}

module.exports = DiscordCommandReboot;
