const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandTravis extends DiscordCommand {

  constructor(subsystem) {
    super("Travis", "Yogstation Supreme Leader", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://cdn.discordapp.com/attachments/293085045743157248/627617800986296321/unknown.png",
		"https://cdn.discordapp.com/attachments/293085045743157248/627618145531723797/unknown.png"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandTravis;
