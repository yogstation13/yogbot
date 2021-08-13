const DiscordCommand = require('./DiscordCommand.js');
var Discord = require('discord.js');

class DiscordImageCommand extends DiscordCommand {
    
    constructor(name, description, permission=null, subsystem, hidden=true, images, color=null, title="") {
        super(name, description, permission, subsystem, hidden);
        this.images = images;
        this.color = color;
        this.title = title;
    }
    onRun(message, permissions, args) {
        var color = null
        if(this.color != null) { 
            color = Math.floor(Math.random()*16777215).toString(16);
        } else {
            color = this.color;
        }
        
        var response = this.images[Math.floor(Math.random() * this.images.length)];
        const embed = new Discord.RichEmbed()
            .setColor('#'+color) // Random Color
            .setTitle(this.title)
            .setImage(response)
            //.setFooter(author) // Uncomment when we have authors

        message.channel.send(embed);
    }
}

module.exports = DiscordImageCommand;