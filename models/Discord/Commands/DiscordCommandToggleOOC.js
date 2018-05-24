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
        var message = (results.data == 1)?"enabled":"disabled";
        message.reply("OOC has been" + message);
      }
    });
  }

}

module.exports = DiscordCommandToggleOOC;
