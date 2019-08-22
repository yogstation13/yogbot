const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandSwiss extends DiscordCommand {

  constructor(subsystem) {
    super("swiss", "Swiss bread", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://i.imgur.com/XE514GF.jpg",
		"https://i.imgur.com/S9pTqVI.jpg",
		"https://i.imgur.com/pcu7ddJ.png",
		"https://i.imgur.com/oScG9hC.jpg",
		"https://i.imgur.com/a3Xkkgw.jpg",
		"https://i.imgur.com/BhNytz6.jpg",
		"https://i.imgur.com/Z31mJ3k.jpg",
		"https://i.imgur.com/nMNBnQW.jpg",
		"https://i.imgur.com/cK6tSAQ.jpg",
		"https://i.imgur.com/yJ3LIGn.jpg",
		"https://i.imgur.com/r24De1h.jpg"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandSwiss;
