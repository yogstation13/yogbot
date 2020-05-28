const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandBug extends DiscordCommand {

  constructor(subsystem) {
    super("bug", "Get off my lawn", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    message.channel.send("https://i.imgur.com/iO03Tqm.gifv");
  }

}

module.exports = DiscordCommandApples;
