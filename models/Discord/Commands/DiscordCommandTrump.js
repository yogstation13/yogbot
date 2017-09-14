const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandTrump extends DiscordCommand {

  constructor(subsystem) {
    super("trump", "Pictures of Murica, fuck yeah", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://i.imgur.com/yzMOoXy.jpg",
		"https://i.imgur.com/sen17FT.png",
		"https://i.imgur.com/YZ4YEXj.jpg", 
		"http://i0.kym-cdn.com/photos/images/original/001/213/930/813.jpg",
		"https://i.imgur.com/AnWiFVZ.jpg",
		"https://i.imgur.com/m1718Sv.jpg",
		"https://i.imgur.com/jFDIKSh.jpg",
		"https://i.imgur.com/ZuWDNqq.jpg",
		"https://i.imgur.com/8SvRpAO.jpg",
		"https://i.imgur.com/yeIbv9C.png",
		"https://i.imgur.com/h1SvmOS.jpg",
		"http://i.imgur.com/MQinI89.jpg",
		"http://i.imgur.com/FJMoq.jpg"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandTrump;
