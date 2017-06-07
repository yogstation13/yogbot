const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandInfo extends DiscordCommand {

	constructor(subsystem) {
		super("info", "Pings the server and names the admins", 'info', subsystem);
	}

	onRun(message, permissions, args) {
		var config = this.subsystem.manager.getSubsystem("Config").config;
		var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;

		byondConnector.request("?adminwho", function (resultsadmin) {
			if ('error' in resultsadmin) {
				message.reply(resultsadmin.error);
			}
			else {
				byondConnector.request("?ping", function (results) {
					if ('error' in results) {
						message.reply(results.error);
					} else {
						message.reply("There are **" + results.data + "** players online, join them now with " + config.server_join_address + "\n" + resultsadmin.data);
					}
				});
			}
		});
	}

}

module.exports = DiscordCommandInfo;
