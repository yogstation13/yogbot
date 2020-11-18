const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandHardy extends DiscordCommand {

  constructor(subsystem) {
    super("hardy", "Pictures of our overlord", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://img.costumecraze.com/images/vendors/rasta/7139-large.jpg",
		"http://www.seanconway.com/uploads/1/3/2/4/13241475/3193657_orig.jpg",
		"https://ilovefancydress.com/image/cache/data/7/Penguin%20Fat%20Suit%20Costume-900x900.jpg",
		"http://img.joke.co.uk/images/products/generic/large/74348.jpg"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
    const embed = new Discord.MessageEmbed()
      .setColor('#'+randomColor) // Random Color
      .setTitle('Hardy Image') // Set to title whenever it is added
      .setImage(response)
      //.setFooter(author) // Uncomment when we have authors

    message.channel.send(embed);
  }

}

module.exports = DiscordCommandHardy;
