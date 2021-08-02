const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandNichlas extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "nichlas";
    this.description = "et-ellerandet et-eller-andet kartoffel";
    this.permission = undefined;
    this.subsystem = subsystem;
    this.hidden = true;
  }

  onRun(message, permissions, args) {
    var svarene = [
      "http://i.imgur.com/RA0v3cW.jpg",
      "http://i.imgur.com/ugbj0m1.png",
      "http://i.imgur.com/pmgSHjz.png"
    ];
    var svar = svarene[Math.floor(Math.random() * svarene.length)];
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
		const embed = new Discord.RichEmbed()
			.setColor('#'+randomColor) // Random Color
			.setTitle('Nichlas Image') // Set to title whenever it is added
			.setImage(svar)
      //.setFooter(author) // Uncomment when we have authors
      
    message.channel.send(embed);
  }

}

module.exports = DiscordCommandNichlas;
