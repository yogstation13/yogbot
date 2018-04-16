const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandMatskuman extends DiscordCommand {

	constructor(subsystem) {
		super("matskuman", "Pictures of ???", undefined, subsystem, true);
	}

	onRun(message, permissions, args) {
		var responses = [
			"https://theburningbloggerofbedlam.files.wordpress.com/2016/04/bush-rigged-elections.jpg",
			"https://www.zerohedge.com/sites/default/files/images/user230519/imageroot/Election%20Rigged_0.jpg",
			"http://img.photobucket.com/albums/v474/autorank/Articles/provingfraud1.png",
			"https://3.bp.blogspot.com/-PNS6WusNS4I/V6pniNovWKI/AAAAAAAAJR4/3jwVP1iDH_IgC0GkTCWIoJuxbmOyS3N8gCLcB/s1600/JoJo%2BStalin.jpg",
			"http://i0.kym-cdn.com/photos/images/original/001/336/017/e85.png"
		];
		var response = responses[Math.floor(Math.random() * responses.length)];
		message.reply(response);
	}

}

module.exports = DiscordCommandMatskuman;
