const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommand8Ball extends DiscordCommand {

	constructor(subsystem) {
		super("8ball", "gaze into the future.", undefined, subsystem, true);
	}

	onRun(message, permissions, args) {
		const responses = [
		"It is certain",
		"It is decidedly so",
		"Without a doubt",
		"Yes – definitely",
		"You may rely on it",
		"As I see it",
		"yes",
		"Most Likely",
		"Outlook good",
		"Yes",
		"Signs point to yes"
		];
		message.channel.send(responses[Math.floor(Math.random() * responses.length)]);
	}
}

module.exports = DiscordCommand8Ball;
