const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandNichlas extends DiscordCommand {

  constructor(subsystem) {
    super("nichlas", "Something something potato", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
      "http://i.imgur.com/RA0v3cW.jpg",
      "http://i.imgur.com/ugbj0m1.png",
      "http://i.imgur.com/pmgSHjz.png"
    ];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandNichlas;
