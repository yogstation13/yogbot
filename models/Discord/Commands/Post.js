const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandPost extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "post";
    this.description = "post the input as yogbot.";
    this.permission = "post";
    this.subsystem = subsystem;
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;

    if(args.length <= 0) {
        message.delete(0);
        return
    }
    message.channel.send(args.join(" "));
    message.delete(0);
    }
}

module.exports = DiscordCommandPost;
