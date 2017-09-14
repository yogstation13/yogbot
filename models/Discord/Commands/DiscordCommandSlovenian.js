const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandSlovenian extends DiscordCommand {

  constructor(subsystem) {
    super("slovenian", "What does this do?", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://i.imgur.com/jAbwgHV.jpg",
		"https://i.imgur.com/VyCcORu.png",
		"https://i.imgur.com/u5V8LZu.jpg",
		"https://i.imgur.com/kyaFmbq.png",
		"https://www.youtube.com/watch?v=ZPblZa10_Pk",
		"https://i.imgur.com/8IaYajq.jpg",
		"https://i.imgur.com/hATrQzv.png",
		"https://i.imgur.com/aqxXkcs.jpg"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandSlovenian;
