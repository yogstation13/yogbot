const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandCodey extends DiscordCommand {

	constructor(subsystem) {
		super("edd", "Pictures of the most depressed player", undefined, subsystem, true);
	}

	onRun(message, permissions, args) {
			var responses = [
      "https://s14-eu5.ixquick.com/cgi-bin/serveimage?url=https:%2F%2Fi.ytimg.com%2Fvi%2FWjs-uSQNUHY%2Fmaxresdefault.jpg&sp=1166b8e187baab32702abd58c80db4dd",
			"http://i62.fastpic.ru/big/2014/0603/f1/e3957b4f3cfdce99d7cedfe871a745f1.jpg",
			"https://www.shitpostbot.com/img/sourceimages/true-slav-squat-580cff3b3c530.jpeg",
			"http://cdn.smosh.com/sites/default/files/bloguploads/bunny-terror-2.jpg",
			"http://userscontent2.emaze.com/images/d48745c4-6667-4e28-adcb-132066de6a57/4a428504-83ee-4c5c-be28-66c8bf66a65f.png",
			"https://pbs.twimg.com/profile_images/702653498152906752/EuLqTwZz.jpg",
			"http://s.twistynoodle.com/img/r/girl-scout-2/i-am-proud-to-be-a-girl-scout/i-am-proud-to-be-a-girl-scout_coloring_page_png_468x609_q85.jpg?ctok=20131015121016",
			"http://s2.quickmeme.com/img/81/815a3fe7180fdee5332d1cb00b02def43e257c4f7b9c031a5d6afaf6dc42a680.jpg",
			"https://pbs.twimg.com/profile_images/667541229450756096/22c3hEyS_400x400.jpg"
		];

		var response = responses[Math.floor(Math.random() * responses.length)];
		message.channel.send(response);
	}

}

module.exports = DiscordCommandCodey;
