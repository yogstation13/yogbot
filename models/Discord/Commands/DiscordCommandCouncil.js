const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandCouncil extends DiscordCommand {

    constructor(subsystem) {
        super("Council", "Pictures of the goings-on at the top of the hiearchy", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
		"https://cdn.discordapp.com/attachments/134720091576205312/871910842164183070/8PQmYdL.png",
		"https://cdn.discordapp.com/attachments/475835667788857375/773148718311931904/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/826240137225830400/image0.png", //Ashcorr gets fooled by Morderhel
		"https://cdn.discordapp.com/attachments/734475284446707753/804697809323556864/unknown.png", //Get a sense of humor
		"https://cdn.discordapp.com/attachments/734475284446707753/804192496322084864/ban.png", //Banned by public vote
		"https://cdn.discordapp.com/attachments/734475284446707753/800864882870059028/image0.png" //Council don't know hotkeys
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
        const embed = new Discord.RichEmbed()
          .setColor('#'+randomColor) // Random Color
          .setTitle('Council Image') // Set to title whenever it is added
          .setImage(response)
          //.setFooter(author) // Uncomment when we have authors

        message.channel.send(embed);
    }

}

module.exports = DiscordCommandCouncil;
