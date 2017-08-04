const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandInfo extends DiscordCommand {

	constructor(subsystem) {
		super("info", "Pings the server and names the admins", 'info', subsystem);
	}

	onRun(message, permissions, args) {
		var config = this.subsystem.manager.getSubsystem("Config").config;
		var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;
		var discord = this.subsystem.manager.getSubsystem("Discord").discord;

		byondConnector.request("?adminwho", (resultsadmin) => {
			if ('error' in resultsadmin) {
				return message.reply(resultsadmin.error);
			}
			
			var adminwho = resultsadmin.data;
			var adminwho = adminwho.split(":")[1];
			byondConnector.request("?ping", (results) => {
				if ('error' in results) {
					return message.reply(results.error);
				}
			
				var embed = new Discord.RichEmbed();

				embed.setAuthor("Information", "http://i.imgur.com/GPZgtbe.png");
				embed.setDescription("Join the server now by using " + config.server_join_address);
				embed.addField("Admins online", adminwho, true);
				embed.addField("Playercount", results.data, true);
				embed.setColor("62f442");

				var channel = config.discord_public_channel;
				message.channel.send({embed});

			});
		});
	}

}

module.exports = DiscordCommandInfo;
