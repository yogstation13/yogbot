const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandArcticfox extends DiscordCommand {

    constructor(subsystem) {
        super("arcticfox", "Pictures of arctic foxes", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePL3FQb4jdPPsJRSfERiEt9ykHETfTH5mAuXDJ089eiBGAqRz",
          "http://elelur.com/data_images/mammals/arctic-fox/arctic-fox-02.jpg",
          "http://www.nationalgeographic.com/content/dam/animals/pictures/mammals/a/arctic-fox/arctic-fox.JPG",
          "http://fennecfoxes.webs.com/evde-baykus.jpg"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
        const embed = new Discord.RichEmbed()
          .setColor('#'+randomColor) // Random Color
          .setTitle('Random Arctic Fox') // Set to title whenever it is added
          .setImage(response)
          //.setFooter(author) // Uncomment when we have authors
          
        message.channel.send(embed);
    }

}

module.exports = DiscordCommandArcticfox;
