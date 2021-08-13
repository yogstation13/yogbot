const DiscordImageCommand = require('../../DiscordImageCommand.js');

class DiscordCommandHardy extends DiscordImageCommand {

	constructor(subsystem) {
		super();
		this.name = "hardy";
		this.description = "Pictures of our overlord";
		this.subsystem = subsystem;
		this.title = "Hardy Image";
		this.images = [
			"http://www.seanconway.com/uploads/1/3/2/4/13241475/3193657_orig.jpg",
			"https://ilovefancydress.com/image/cache/data/7/Penguin%20Fat%20Suit%20Costume-900x900.jpg"
		];
	}
}

module.exports = DiscordCommandHardy;
