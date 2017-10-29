const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandSimon extends DiscordCommand {

  constructor(subsystem) {
    super("simon", "Pictures of the Dæne", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://i.imgur.com/0kAL9J2.jpg",
		"https://i.imgur.com/dSAITGh.jpg",
		"https://i.imgur.com/c1UdgVr.jpg",
		"https://i.imgur.com/uDsHVLW.jpg",
		"https://i.imgur.com/1X91zDV.jpg",
		"https://i.imgur.com/TIzPllv.jpg",
		"https://i.imgur.com/MF5a1I8.png"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandSimon;
