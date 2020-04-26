const DiscordCommand = require('../DiscordCommand.js');
const StringUtils = require('../../Utils/String.js');
const querystring = require('querystring');
var Discord = require('discord.js');

class DiscordCommandInfo extends DiscordCommand {

	constructor(subsystem) {
		super("info", "Pings the server and names the admins", 'info', subsystem);
	}

	onRun(message, permissions, args) {
		var config = this.subsystem.manager.getSubsystem("Config").config;
		var byondSS = this.subsystem.manager.getSubsystem("Byond Connector");
		var discord = this.subsystem.manager.getSubsystem("Discord").discord;
		var byondmessage = "?adminwho";
		
		if(message.channel.id == config.discord_channel_admin || message.channel.id == config.discord_channel_admemes || message.channel.id == config.discord_channel_council) {
			byondmessage += "&adminchannel=1";
		}

		byondSS.byondConnector.request(byondmessage, (resultsadmin) => {
			if ('error' in resultsadmin) {
				return message.channel.send(resultsadmin.error);
			}

			var adminwho = resultsadmin.data;
			adminwho = adminwho.split(":")[1];
			adminwho = StringUtils.replaceAll(adminwho, "\t", "");
			adminwho = StringUtils.replaceAll(adminwho, "\0", "");
			byondSS.byondConnector.request("?status", (resultsstatus) => {
				if ('error' in resultsstatus) {
					return message.channel.send(results.error);
				}
				var round_duration = querystring.parse(resultsstatus.data)["round_duration"];
				var shuttle_mode = querystring.parse(resultsstatus.data)["shuttle_mode"] || "Idle";
				var shuttle_time = querystring.parse(resultsstatus.data)["shuttle_timer"] || 10;
				var round_id = querystring.parse(resultsstatus.data)["round_id"];
				shuttle_time = StringUtils.replaceAll(shuttle_time, "\0", "");
				shuttle_time = shuttle_time/60;
				var security_level = querystring.parse(resultsstatus.data)["security_level"];
				var shuttle_modes = ["Idle", "Returning", "Transit to station", "Docked", "Stranded", "Transit to CentComm", "Docked at CentComm"];
				shuttle_mode = shuttle_modes[shuttle_mode]; 
				round_duration = Math.round(round_duration/60);
				var embedcolor = "";
				var colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

				for(var count = 0; count < 6; count++) {
					embedcolor = embedcolor + colors[Math.floor(Math.random() * colors.length)];
					//picks a colour from the array "colours" then proceeds to add it to "colour", and stops once "colour" has 6 digits
				}

				var embed = new Discord.RichEmbed();

				embed.setAuthor("Information", "http://i.imgur.com/GPZgtbe.png");
				embed.setDescription("Join the server now by using " + config.server_join_address);
				embed.addField("Players online:", results.data, true);
				embed.addField("Current round:", round_id, true);
				embed.addField("Round duration:", round_duration + " Minutes", true);
				if(shuttle_mode) {
					embed.addField("Shuttle status:", shuttle_mode, true);
					if(shuttle_mode != "Idle" && shuttle_mode != "Stranded" && shuttle_mode != "Docked at Centcomm") {
						embed.addField("Shuttle timer:", Math.round(shuttle_time) + " Minutes", true);
					}
				}
				embed.addField("Security level:", security_level, true);
				if(adminwho.length && adminwho != " ") {
					embed.addField("Admins online:", adminwho, false); //this field has a dynamic size, and should be the last field ~~Nich
				}
				embed.setColor(embedcolor);

				message.channel.send({embed});
			});
		});
	}

}

module.exports = DiscordCommandInfo;
