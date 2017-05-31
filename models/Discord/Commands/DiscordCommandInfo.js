const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandInfo extends DiscordCommand {

	constructor(subsystem) {
		super("info", "Pings the server and names the admins", 'info', subsystem);
	}

	onRun(message, permissions, args) {
		var config = this.subsystem.manager.getSubsystem("Config").config;
		var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;

		byondConnector.request("?adminwho", function (resultsadmin, error) {
			if (error) return	message.reply(error);

			byondConnector.request("?ping", function (results, error) {
				if(error) return message.reply(error);

				message.reply("There are **" + results + "** players online, join them now with " + config.server_join_address + "\n" + resultsadmin);
			});
		});
	}

}

module.exports = DiscordCommandInfo;
