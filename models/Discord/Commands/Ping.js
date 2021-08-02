const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandPing extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "ping";
    this.description = "Pings the server.";
    this.permission = "ping";
    this.subsystem = subsystem;
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;

    byondConnector.request("?ping", (results) => {
      if('error' in results) {
        message.channel.send(results.error);
      } else {
        message.reply("There are **" + results.data + "** players online, join them now with " + config.server_join_address);
      }
    });
  }

}

module.exports = DiscordCommandPing;
