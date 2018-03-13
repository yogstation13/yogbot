const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandGray extends DiscordCommand {

  constructor(subsystem) {
    super("gray", "Pictures of disappointment", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://i.imgur.com/NqAej6K.jpg",
		"https://i.imgur.com/MMioT7U.jpg",
		"https://i.imgur.com/hjFFSo0.jpg",
		"https://i.imgur.com/viQe71t.jpg",
		"https://i.imgur.com/KHrTewi.jpg"
	];
    var رد = responses[Math.floor(Math.random() * responses.length)];
    message.reply(رد);
  }

}

module.exports = DiscordCommandGray;
