const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandUnlink extends DiscordCommand {

  constructor(subsystem) {
    super("unlink", "Unlinks a ckey from a Discord ID", 'unlink', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;

    if(args.length < 1) {
        message.reply("Usage is " + config.discord_command_character + "unlink [ckey]")
        return
    }
    this.subsystem.manager.getSubsystem("Byond Connector").request("?unlink=" + encodeURIComponent(args[0]))
      .then(message.reply)
      .catch(message.channel.send)
  }

}

module.exports = DiscordCommandUnlink;