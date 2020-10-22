const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandCoder extends DiscordCommand {

    constructor(subsystem) {
        super("coder", "dumb stuff the dev team says", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
          "https://cdn.discordapp.com/attachments/347045440958627841/766286538107519006/unknown.png",
          "https://cdn.discordapp.com/attachments/347045440958627841/766286291175735356/unknown.png",
          "https://cdn.discordapp.com/attachments/347045440958627841/766284877850476544/unknown.png",
          "https://cdn.discordapp.com/attachments/347045440958627841/766077319679967282/unknown.png",
          "https://cdn.discordapp.com/attachments/205784753352343552/768234096244817980/unknown.png",
          "https://cdn.discordapp.com/attachments/347045440958627841/763421934431895632/Capture_2020-10-07-11-25-27.png",
          "https://cdn.discordapp.com/attachments/710261756710354985/767046065336614932/Capture_2020-10-17-11-26-26.png",
          "https://cdn.discordapp.com/attachments/710261756710354985/767045106884018196/unknown.png",
          "https://cdn.discordapp.com/attachments/710261756710354985/767044874595598356/Capture_2020-10-17-11-15-38.png",
          "https://tenor.com/view/dog-cute-happy-samoyed-puppy-gif-14818829",
          "https://cdn.discordapp.com/attachments/205784753352343552/768561221300387870/unknown.png",
          "https://cdn.discordapp.com/attachments/134720091576205312/768629149862199306/unknown.png",
          "https://cdn.discordapp.com/attachments/134720091576205312/768629387267801088/unknown.png",
          "https://cdn.discordapp.com/attachments/134720091576205312/768629825392607242/unknown.png"
          
          
          
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
        const embed = new Discord.RichEmbed()
            .setColor('#'+randomColor) // Random Color
            .setTitle('Coder Image') // Set to title whenever it is added
            .setImage(response)
            //.setFooter(author) // Uncomment when we have authors

        message.channel.send(embed);
    }

}

module.exports = DiscordCommandCoder;
