const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandMyID extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "myid";
    this.description = "Provides your Discord ID, used for account linking";
    this.permission = undefined;
    this.subsystem = subsystem;
  }

  onRun(message, permissions, args) {
    message.reply("Your ID is: " + message.author.id);
  }

}

module.exports = DiscordCommandMyID;