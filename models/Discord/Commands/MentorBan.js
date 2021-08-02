const DiscordCommand = require('../DiscordCommand.js');	

class DiscordCommandMentorban extends DiscordCommand {	

    constructor(subsystem) {	
        super();
        this.name = "mentorban";
        this.description = "Ban someone from the mentor channel.";
        this.permission = "mentorban";
        this.subsystem = subsystem;
    }	

    onRun(message, permissions, args) {	
        let config = this.subsystem.manager.getSubsystem("Config").config;	
        let role = config.discord_mentorban_role;
        let member = message.mentions.members.first();

        if(member == undefined) {
          message.reply("I could not find that user, Make sure you use the mention format of @Username");
          return;
        }

        if (member.roles.has(config.discord_mentorban_role)) {	
            member.removeRole(config.discord_mentorban_role);	
            var response = "User was un-mentorbanned."	
        }	
        else {	
            member.addRole(config.discord_mentorban_role);	
            var response = "User was mentorbanned."	
        }	

        message.channel.send(response);	
    }	

}	

module.exports = DiscordCommandMentorban;

