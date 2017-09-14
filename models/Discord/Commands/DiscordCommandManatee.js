const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandManatee extends DiscordCommand {

  constructor(subsystem) {
    super("manatee", "Pictures of very menacing manatees", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://i.imgur.com/t1I6aAg.png",
		"https://i.imgur.com/bCguwdn.jpg",
		"https://i.imgur.com/Z6IF4gR.jpg",
		"https://i.imgur.com/5VIfWhF.png",
		"https://i.imgur.com/gXYhvki.jpg",
		"https://i.imgur.com/cSXO2i4.jpg",
		"https://i.imgur.com/1TyBOOB.jpg",
		"https://i.imgur.com/Wmrqu0U.jpg",
		"https://i.imgur.com/9d8xCRQ.jpg",
		"https://i.imgur.com/OlBm7g2.png",
		"https://i.imgur.com/xwEhrno.jpg",
		"http://i.imgur.com/jexXwfD.jpg?1"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandManatee;
