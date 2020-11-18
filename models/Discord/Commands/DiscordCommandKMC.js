const Discord = require("discord.js");

const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandKMC extends DiscordCommand {

    constructor(subsystem) {
        super("kmc", "Pictures of event organizers", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
            "https://cdn.discordapp.com/attachments/300800158260658177/313801305271566337/images26.jpg",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801304520523776/images5.png",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801304449351680/images6.png",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801383059128322/yeezy-boost-350-v2-hbx-restock-1.jpg",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801382568132611/adidas-Yeezy-Boost-350-v2-.jpg"
        ];

        var response = responses[Math.floor(Math.random() * responses.length)];
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
        const embed = new Discord.MessageEmbed()
            .setColor('#'+randomColor) // Random Color
            .setTitle('KMC Image') // Set to title whenever it is added
            .setImage(response)
            //.setFooter(author) // Uncomment when we have authors

        message.channel.send(embed);
    }

}

module.exports = DiscordCommandKMC;