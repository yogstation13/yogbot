const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommand8Ball extends DiscordCommand {

	constructor(subsystem) {
		super("8ball", "gaze into the future.", undefined, subsystem, true);
	}

	onRun(message, permissions, args) {
		const responses = [
			"It is certain.",
			"It is decidedly so.",
			"Without a doubt.",
			"Yes - definitely.",
			"You may rely on it.",
			"As I see it, yes.",
			"Most likely.",
			"Outlook good.",
			"Yes.",
			"Signs point to yes.",
			"Reply hazy, try again.",
			"Ask again later.",
			"Better not tell you now.",
			"Cannot predict now.",
			"Concentrate and ask again.",
			"Don't count on it.",
			"My reply is no.",
			"My sources say no.",
			"Outlook not so good.",
			"Very doubtful."
		]
		message.channel.send(responses[Math.floor(Math.random() * responses.length)]);
	}
}

module.exports = DiscordCommand8Ball;
