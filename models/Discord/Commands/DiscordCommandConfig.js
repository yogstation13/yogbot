const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandConfig extends DiscordCommand {

  constructor(subsystem) {
    super("config", "Edit config option.", 'config', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;

    if(args.length < 2) {
      message.reply("Try using `" + config.discord_command_character + "config [OptionName] [Value]`");
      return;
    }

    if(this.subsystem.manager.getSubsystem("Config").setConfig(args[0], args[1])) {
      message.reply("Updated config file.");
    } else {
      message.reply("Failed to update config file, are you sure that option exists?");
    }
  }

}

module.exports = DiscordCommandConfig;
