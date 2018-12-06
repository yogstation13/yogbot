const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandSuper extends DiscordCommand {

  constructor(subsystem) {
    super("super", "Pictures of snek", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://i.imgur.com/0bkA8Ko.png",
		"https://i.imgur.com/EcBQVJT.png",
		"https://i.imgur.com/03rhf09.png",
		"https://i.imgur.com/fCVvPi1.png",
		"https://i.imgur.com/ctRGgxf.png",
		"https://i.imgur.com/oFnDHcE.png",
		"https://i.imgur.com/u9ItzXA.jpg",
		"https://i.imgur.com/9O5UNCD.png",
		"https://i.imgur.com/70fi8ym.png",
		"https://i.imgur.com/i87kuZR.png",
		"https://i.imgur.com/0J2DypJ.png"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandSuper;
