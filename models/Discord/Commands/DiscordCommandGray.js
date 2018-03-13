const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandGray extends DiscordCommand {

  constructor(subsystem) {
    super("gray", "أمة أوتاكو", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var ردود = [
		"https://i.imgur.com/NqAej6K.jpg",
		"https://i.imgur.com/MMioT7U.jpg",
		"https://i.imgur.com/hjFFSo0.jpg",
		"https://i.imgur.com/viQe71t.jpg",
		"https://i.imgur.com/KHrTewi.jpg"
	];
    var responses = ردود[Math.floor(Math.random() * ردود.length)]; // I TRIED FOR SO LONG TO GET IT TO USE THE ARABIC FOR RESPONSES, BUT IT DECIDED THAT IT'D RATHER MOVE MY CODE AROUND AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    message.reply(responses);
  }

}

module.exports = DiscordCommandGray;
