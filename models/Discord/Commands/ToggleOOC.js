const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandToggleOOC extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "toggleooc";
    this.description = "Toggles server OOC.";
    this.permission = "toggleooc";
    this.subsystem = subsystem;
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;

    byondConnector.request("?toggleooc", (results) => {
      if('error' in results) {
        message.channel.send(results.error);
      } else {
        var messageString = (results.data == 1)?"enabled":"disabled";
        message.reply("OOC has been " + messageString);
      }
    });
  }

}

module.exports = DiscordCommandToggleOOC;
