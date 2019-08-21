const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandUnlink extends DiscordCommand {

  constructor(subsystem) {
    super("unlink", "Unlinks a ckey from a Discord ID", 'unlink', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;

    if(args.length < 1) {
        message.reply("Usage is " + config.discord_command_character + "unlink [ckey]")
        return
    }
    byondConnector.request("?unlink=" + encodeURIComponent(args[0]), (results) => {
      if('error' in results) {
        message.channel.send(results.error);
      } else {
        message.reply(results.data.substring(0, results.data.length - 1));
      }
    });
  }

}

module.exports = DiscordCommandUnlink;