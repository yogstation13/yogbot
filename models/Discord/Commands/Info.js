const DiscordCommand = require('../DiscordCommand.js');
const StringUtils = require('../../Utils/String.js');
const querystring = require('querystring');
var Discord = require('discord.js');

class DiscordCommandInfo extends DiscordCommand {

	constructor(subsystem) {
		super();
		this.name = "info";
		this.description = "Pings the server and names the admins";
		this.permission = "info";
		this.subsystem = subsystem;
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
			byondSS.byondConnector.request("?ping", (results) => {
				if ('error' in results) {
					return message.channel.send(results.error);
				}
				byondSS.byondConnector.request("?status", (resultsstatus) => {
					if ('error' in resultsstatus) {
						return message.channel.send(resultsstatus.error);
					}
					var round_duration = querystring.parse(resultsstatus.data)["round_duration"] || "Unknown";
					var shuttle_mode = querystring.parse(resultsstatus.data)["shuttle_mode"] || "idle";
					var shuttle_time = querystring.parse(resultsstatus.data)["shuttle_timer"] || 10;
					var round_id = querystring.parse(resultsstatus.data)["round_id"] || "Unknown";
					var security_level = querystring.parse(resultsstatus.data)["security_level"] || "Unknown";
					var shuttle_modes_strings = {
						idle: "Idle",
						igniting: "Docked", //its only in this state for 10 seconds, not worth the confusion
						recall: "Recalled",
						call: "Called",
						docked: "Docked",
						stranded: "Disabled", //hostile environment
						escape: "Departed",
						"endgame: game over": "Round over",
						recharging: "Charging",
						landing: "Called" //only in this state for a couple of seconds too
					};

					const timer_display = [
						"call",
						"recall",
						"igniting",
						"docked",
						"escape",
						"landing"
					]

					const alert_colors = {
						green: "12a125",
						blue: "1242a1",
						red: "a11212",
						gamma: "d6690a",
						epsilon: "617444",
						delta: "2e0340"
					};

					// @ts-ignore
					const round_duration_int = Math.round(parseInt(round_duration)/60);

					const embed = new Discord.RichEmbed();

					embed.setAuthor("Information", "http://i.imgur.com/GPZgtbe.png");
					embed.setDescription("Join the server now by using " + config.server_join_address);
					embed.addField("Players online:", results.data, true);
					embed.addField("Current round:", round_id, true);
					embed.addField("Round duration:", round_duration_int + " minutes", true);
					embed.addField("Shuttle status:", shuttle_modes_strings[shuttle_mode], true);
					// @ts-ignore
					if(timer_display.includes(shuttle_mode)) {
						// @ts-ignore
						embed.addField("Shuttle timer:", Math.round(parseInt(shuttle_time)/60) + " minutes", true);
					}
					embed.addField("Security level:", security_level, true);
					if(adminwho.trim().length) {
						embed.addField("Admins online:", adminwho, false); //this field has a dynamic size, and should be the last field ~~Nich
					}
					embed.setColor(alert_colors[security_level]);

					message.channel.send({embed});
				});
			});
		});
	}

}

module.exports = DiscordCommandInfo;
