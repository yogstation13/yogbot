const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandMyID extends DiscordCommand {

  constructor(subsystem) {
    super("myid", "Provides your Discord ID, used for account linking", undefined, subsystem);
  }

  onRun(message, permissions, args) {
    message.reply("Your ID is: " + message.author.id);
  }

}

module.exports = DiscordCommandMyID;