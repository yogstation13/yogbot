const DiscordCommand = require('../DiscordCommand.js');	

class DiscordCommandUserverify extends DiscordCommand {	

    constructor(subsystem) {	
        super();
        this.name = "userverify";
        this.description = "Verifies someone on the discord. Use again to unverify someone.";
        this.permission = "userverify";
        this.subsystem = subsystem;
    }	

    onRun(message, permissions, args) {	
        let config = this.subsystem.manager.getSubsystem("Config").config;	
        let member = message.mentions.members.first();
        
        if(member == undefined) {
          message.reply("I could not find that user, Make sure you use the mention format of @Username");
          return;
        }

        let response;
        if (member.roles.has(config.discord_verify_role)) {	
            member.removeRole(config.discord_verify_role);	
            response = "User was manually unverified.";
        }
        else {	
            member.addRole(config.discord_verify_role);
            member.addRole(config.discord_announcements_role);	
            response = "User was manually verified.";
        }
        message.channel.send(response);	
    }	

}	

module.exports = DiscordCommandUserverify;
