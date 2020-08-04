const DiscordCommand = require('../DiscordCommand.js');	

class DiscordCommandStaffban extends DiscordCommand {	

    constructor(subsystem) {	
        super("staffban", "Gives a person 1st and 2nd warning staff public role, then bans them.", 'staffban', subsystem);	
    }	

    onRun(message, permissions, args) {	
        let config = this.subsystem.manager.getSubsystem("Config").config;	
        let member = message.mentions.members.first();
        
        if(member == undefined) {
          message.reply("I could not find that user, Make sure you use the mention format of @Username");
          return;
        }

        if (member.roles.has(config.discord_secondwarning_role)) {	
            member.addRole(config.discord_staffpublicban_role);	
            var response = "User was banned from staff public."	
        }	
        else if (member.roles.has(config.discord_firstwarning_role)) {	
                member.addRole(config.discord_secondwarning_role);	
                var response = "User was given the second warning role."
        }
        else {
            member.addRole(config.discord_firstwarning_role);	
            var response = "User was given the first warning role."	
        }
		
        message.channel.send(response);	
    }	

}	

module.exports = DiscordCommandStaffban;
