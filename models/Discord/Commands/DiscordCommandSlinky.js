const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandSlinky extends DiscordCommand {

	constructor(subsystem) {
		super("slinky", "Pictures of the man who wants to watch the world burn", undefined, subsystem, true);
	}

	onRun(message, permissions, args) {
		var responses = [
      "http://www.hamleys.com/images/_lib/hamleys-slinky-9779-0-1415972128000.jpg",
			"https://media0.giphy.com/media/Bq5z7WbQSt6xO/giphy-facebook_s.jpg?t=1",
			"https://smedia.webcollage.net/rwvfp/wc/cp/24040872/module/flairuk/_cp/products/1492616445483/tab-44df8d1c-4de7-4ffa-8d3a-3a1b0078adc7/b677a172-9c07-41ec-9af1-c9c752031929.jpg.w480.jpg",
			"http://www.bluemaize.net/im/toys/slinky-dog-from-toy-story-2.jpg",
			"https://i.warosu.org/data/tg/img/0507/35/1482010703663.jpg",
			"https://fabiusmaximus.files.wordpress.com/2009/01/20130928-world-burn.jpg"
		];

		var response = responses[Math.floor(Math.random() * responses.length)];
		message.channel.send(response);
	}

}

module.exports = DiscordCommandSlinky;
