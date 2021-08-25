const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandKickself extends DiscordCommand {

	constructor(subsystem) {
		super("kickself", "Kicks you", undefined, subsystem);
	}

	onRun(message, permissions, args) {
		if (permissions.includes("kickself")) {
			message.reply("I'm afraid I can't let you kick yourself.");
		}
		else {
			var guildMember = message.member;
			message.channel.send(guildMember + " has kicked themself from the server");
			guildMember.kick();
		}
	}
}

module.exports = DiscordCommandKickself;
