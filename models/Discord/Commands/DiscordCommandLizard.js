const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandLizard extends DiscordCommand {

    constructor(subsystem) {
        super("lizard", "Pictures of lizards", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
          "http://claycord.com/wp-content/uploads/2015/03/nature.jpg",
          "http://i1.treknature.com/photos/1457/kuscar.jpg",
          "https://c1.staticflickr.com/8/7460/9393543410_dfef909a67_b.jpg",
          "http://www.richard-seaman.com/Wallpaper/Nature/Reptiles/Lizards/AngryPhanomBenchaLizard.jpg",
          "https://s-media-cache-ak0.pinimg.com/originals/17/62/95/176295a832814825bdcd2528a459ed85.jpg",
          "http://www.richard-seaman.com/Wallpaper/Nature/Reptiles/Lizards/AngryFlyingGecko.jpg",
          "https://i.imgur.com/CvX43mP.png",
          "https://i.imgur.com/xoCR0TV.jpg",
          "https://i.imgur.com/VoUe931.jpg",
          "https://i.imgur.com/VfxMpFt.jpg"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
        const embed = new Discord.RichEmbed()
            .setColor('#'+randomColor) // Random Color
            .setTitle('Lizard Image') // Set to title whenever it is added
            .setImage(response)
            //.setFooter(author) // Uncomment when we have authors

        message.channel.send(embed);
    }

}

module.exports = DiscordCommandLizard;
