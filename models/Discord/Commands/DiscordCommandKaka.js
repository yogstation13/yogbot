const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandKaka extends DiscordCommand {

  constructor(subsystem) {
    super("Kaka", "George Kaka, himself", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://cdn.discordapp.com/attachments/134720091576205312/627618922656432138/unknown.png",
		"https://cdn.discordapp.com/attachments/293085045743157248/627619236562468864/unknown.png",
		"https://cdn.discordapp.com/attachments/293085045743157248/627619335594049576/unknown.png",
		"https://i.ytimg.com/vi/esN15ix0E_8/maxresdefault.jpg",
		"https://i.redd.it/dta7voht3dk31.png",
		"https://cdn.discordapp.com/attachments/293085045743157248/627619130085998602/unknown.png"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandKaka;
