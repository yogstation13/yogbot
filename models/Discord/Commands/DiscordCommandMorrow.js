const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandMorrow extends DiscordCommand {

  constructor(subsystem) {
    super("morrow", "Shitcurity", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://i.ytimg.com/vi/KLrKhwdFV0k/hqdefault.jpg",
		"https://i.warosu.org/data/tg/img/0333/47/1405134269614.jpg",
		"https://i.warosu.org/data/tg/img/0279/14/1382614250280.jpg",
		"https://i.warosu.org/data/tg/img/0376/61/1422418112824.png",
		"http://i0.kym-cdn.com/photos/images/original/000/912/556/ef5.png",
		"https://i.imgur.com/LySOaCy.png",
		"https://i.imgur.com/I6sdjhE.png",
		"https://i.imgur.com/67RIAY8.png"
    ];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandMorrow;
