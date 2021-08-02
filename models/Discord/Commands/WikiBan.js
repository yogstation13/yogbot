const DiscordCommand = require('../DiscordCommand.js');	

class DiscordCommandWikiban extends DiscordCommand {	

    constructor(subsystem) {	
        super();	
        this.name = "wikiban";
        this.description = "Ban someone from the wiki channel.";
        this.permission = "wikiban";
        this.subsystem = subsystem;
    }	

    onRun(message, permissions, args) {	
        let config = this.subsystem.manager.getSubsystem("Config").config;	
        let role = config.discord_wikiban_role;
        let member = message.mentions.members.first();

        if(member == undefined) {
          message.reply("I could not find that user, Make sure you use the mention format of @Username");
          return;
        }

        if (member.roles.has(config.discord_wikiban_role)) {	
            member.removeRole(config.discord_wikiban_role);	
            var response = "User was un-wikibanned."	
        }	
        else {	
            member.addRole(config.discord_wikiban_role);	
            var response = "User was wikibanned."	
        }	

        message.channel.send(response);	
    }	

}	

module.exports = DiscordCommandWikiban;
