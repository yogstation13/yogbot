const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandBug extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "bug";
    this.description = "Get off my lawn";
    this.permission = undefined;
    this.subsystem = subsystem;
    this.hidden = true;
  }

  onRun(message, permissions, args) {
    message.channel.send("https://i.imgur.com/iO03Tqm.gifv");
  }

}

module.exports = DiscordCommandBug;
