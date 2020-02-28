const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandPost extends DiscordCommand {

  constructor(subsystem) {
    super("post", "post the input as yogbot.", 'post', subsystem);
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
