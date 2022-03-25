const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandToggleOOC extends DiscordCommand {

  constructor(subsystem) {
    super("toggleooc", "Toggles server OOC.", 'toggleooc', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;

    this.subsystem.manager.getSubsystem("Byond Connector").request("?toggleooc")
      .then(response => {
        var messageString = (response == 1) ? "enabled" : "disabled";
        message.reply("OOC has been " + messageString);
      })
      .catch(message.channel.send)
  }

}

module.exports = DiscordCommandToggleOOC;
