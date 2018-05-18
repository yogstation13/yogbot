const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandToggleOOC extends DiscordCommand {

  constructor(subsystem) {
    super("toggleooc", "Toggles server OOC.", 'toggleooc', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;

    byondConnector.request("?toggleooc", (results) => {
      if('error' in results) {
        message.reply(results.error);
      } else {
        message.reply("OOC has been [results.data ? "enabled" : "disabled]");
      }
    });
  }

}

module.exports = DiscordCommandToggleOOC;
