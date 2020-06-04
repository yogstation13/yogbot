const DiscordCommand = require('../DiscordCommand.js');	

class DiscordCommandLoreban extends DiscordCommand {	

    constructor(subsystem) {	
        super("loreban", "Ban someone from the lore channel.", 'loreban', subsystem);	
    }	

    onRun(message, permissions, args) {	
        let config = this.subsystem.manager.getSubsystem("Config").config;	
        let role = config.discord_loreban_role;
        let member = message.mentions.members.first();
        
        if(member == undefined) {
          message.reply("I could not find that user, Make sure you use the mention format of @Username");
          return;
        }

        if (member.roles.has(config.discord_loreban_role)) {	
            member.removeRole(config.discord_loreban_role);	
            var response = "User was un-lorebanned."	
        }	
        else {	
            member.addRole(config.discord_loreban_role);	
            var response = "User was lorebanned."	
        }	

        message.channel.send(response);	
    }	

}	

module.exports = DiscordCommandLoreban;
