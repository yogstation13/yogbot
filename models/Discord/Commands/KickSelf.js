const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandKickself extends DiscordCommand {

	constructor(subsystem) {
		super();
		this.name = "kickself";
		this.description = "Kicks you.";
		this.permission = undefined;
		this.subsystem = subsystem;
	}

	onRun(message, permissions, args) {
		if (permissions.includes("kickself")) {
			message.reply("cannot kick staff");
		}
		else {
			var guildMember = message.member;
			message.channel.send(guildMember + " has kicked themself from the server");
			guildMember.kick();
		}
	}
}

module.exports = DiscordCommandKickself;
