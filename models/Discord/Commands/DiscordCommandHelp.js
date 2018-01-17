const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandHelp extends DiscordCommand {

  constructor(subsystem) {
    super("help", "Displays a list of commands you have access to", undefined, subsystem);
  }

  onRun(message, permissions, args) {
    var response = "Available Commands: \n";
    var config = this.subsystem.manager.getSubsystem("Config").config;

    var helpOption = args[0];

    for (var command of this.subsystem.commands) {
      if (command.hidden) {
        continue;
      }
      if (command.hasPermission(permissions) || this.subsystem.permissionManager.permissions["admins"].includes(message.author.id)) {
        response += "    `" + config.discord_command_character + command.name + "` - " + command.description + "\n";
      }
    }
    message.reply(response);
  }

}

module.exports = DiscordCommandHelp;
