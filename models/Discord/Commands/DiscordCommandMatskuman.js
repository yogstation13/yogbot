const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandMatskuman extends DiscordCommand {

	constructor(subsystem) {
		super("matskuman", "Pictures of ???", undefined, subsystem);
	}

	onRun(message, permissions, args) {
		var responses = [
			"http://vignette3.wikia.nocookie.net/ssb-tourney/images/5/57/Riddler_CG_Art.jpg/revision/latest?cb=20131117233412",
			"http://unisci24.com/data_images/wlls/41/311940-question-mark.jpg",
			"http://combiboilersleeds.com/images/who/who-2.jpg",
			"http://gclipart.com/wp-content/uploads/2017/03/Question-mark-clip-art-2.gif",
			"http://gclipart.com/wp-content/uploads/2017/03/Question-mark-clip-art-2.gif",
			"http://vignette2.wikia.nocookie.net/villains/images/a/a6/Riddler_%28Batman_Forever%29.jpg/revision/latest?cb=20140128214050",
			"http://cdn2us.denofgeek.com/sites/denofgeekus/files/styles/insert_main_wide_image/public/gorshin-riddler.jpg",
			"https://pbs.twimg.com/media/Cona3auXYAA-Pw9.jpg"
		];
		var response = responses[Math.floor(Math.random() * responses.length)];
		message.reply(response);
	}

}

module.exports = DiscordCommandMatskuman;
