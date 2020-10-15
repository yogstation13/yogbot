const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandOak extends DiscordCommand {

  constructor(subsystem) {
    super("oak", "Pigdures of counzil blease :DDDD", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
	    "https://i.imgur.com/BFV771G.png",
	    "https://i.imgur.com/BsfISII.png"
    ];
	var response = responses[Math.floor(Math.random() * responses.length)];
	const embed = new Discord.RichEmbed()
		.setColor('#'+randomColor) // Random Color
		.setTitle('Moja Image') // Set to title whenever it is added
		.setImage(response)
		//.setFooter(author) // Uncomment when we have authors

    message.channel.send(embed);
  }

}

module.exports = DiscordCommandOak;
