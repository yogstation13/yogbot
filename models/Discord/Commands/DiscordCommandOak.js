const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandOak extends DiscordCommand {

  constructor(subsystem) {
    super("oak", "Pigdures of counzil blease :DDDD", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://i.imgur.com/YO4xlTm.jpg",
		"https://i.imgur.com/S32NXxA.png",
		"https://i.imgur.com/7XU94T2.png",
		"https://i.imgur.com/TAY4qep.png",
		"https://memestatic.fjcdn.com/pictures/Gondola_1ea063_6170689.jpg",
		"https://memes4.fjcdn.com/pictures/Gondola_b416c4_6170689.jpg",
		"https://memes4.fjcdn.com/pictures/Gondola_c27111_6170689.jpg",
		"https://memestatic.fjcdn.com/pictures/Gondola+art_a1ac9a_6170689.jpg",
		"https://memes4.fjcdn.com/pictures/Gondola_730f7e_6170689.jpg",
		"http://i.imgur.com/SVwB908.png",
		"https://i.imgur.com/ZSZzW91.png"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandOak;
