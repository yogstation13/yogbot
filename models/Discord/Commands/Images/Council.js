const DiscordImageCommand = require('../../DiscordImageCommand.js');

class DiscordCommandCouncil extends DiscordImageCommand {

    constructor(subsystem) {
        super();
        this.name = "council";
        this.description = "Pictures of the goings-on at the top of the hiearchy";
        this.subsystem = subsystem;
        this.title = "Council Image";
        this.images = [
		    "https://i.imgur.com/8PQmYdL.png",
		    "https://cdn.discordapp.com/attachments/475835667788857375/773148718311931904/unknown.png",
		    "https://cdn.discordapp.com/attachments/734475284446707753/826240137225830400/image0.png", //Ashcorr gets fooled by Morderhel
		    "https://cdn.discordapp.com/attachments/734475284446707753/804697809323556864/unknown.png", //Get a sense of humor
		    "https://cdn.discordapp.com/attachments/734475284446707753/804192496322084864/ban.png", //Banned by public vote
		    "https://cdn.discordapp.com/attachments/734475284446707753/800864882870059028/image0.png" //Council don't know hotkeys
        ];
    }
}

module.exports = DiscordCommandCouncil;
