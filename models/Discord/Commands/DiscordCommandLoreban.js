const DiscordCommand = require('../DiscordCommand.js');	

class DiscordCommandLoreban extends DiscordCommand {	

    constructor(subsystem) {	
        super("loreban", "Ban someone from the lore channel.", undefined, subsystem);	
    }	

    onRun(message, permissions, args) {	
        var config = this.subsystem.manager.getSubsystem("Config").config;	
		let role = config.discord_loreban_role;
		let member = message.mentions.members.first();

		if (permissions.includes('loreban')) {	
            message.member.removeRole(config.discord_loreban_role);	
            var response = "User was un-lorebanned."	
        }	
        else {	
            message.member.addRole(config.discord_loreban_role);	
            var response = "User was lorebanned."	
        }	

        message.channel.send(response);	
    }	

}	

module.exports = DiscordCommandLoreban;