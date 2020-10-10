const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandApples extends DiscordCommand {

  constructor(subsystem) {
    super("apples", "Pictures of disappointment", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"http://i.imgur.com/AnUmGx3.jpg",
		"http://i.imgur.com/AGMzoP7.png",
		"http://i.imgur.com/aUkVKnf.png",
		"http://i.imgur.com/uotAwAy.png",
		"http://i.imgur.com/NKeMihP.png",
		"http://i.imgur.com/ruSaMoS.png",
		"http://i.imgur.com/wP89Euc.png",
		"http://i.imgur.com/By4rdWL.jpg",
		"http://i.imgur.com/XljVPoq.jpg",
		"http://i.imgur.com/UYExMSS.jpg",
		"http://i.imgur.com/7sklrgF.jpg",
		"https://cdn.discordapp.com/attachments/347045440958627841/383896146650726420/Screenshot_20171125-032401.png"
	];
	var response = responses[Math.floor(Math.random() * responses.length)];
	var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
    const embed = new Discord.RichEmbed()
      .setColor('#'+randomColor) // Random Color
      .setTitle('Apple!') // Set to title whenever it is added
      .setImage(response)
	  //.setFooter(author) // Uncomment when we have authors
	  
    message.channel.send(embed);
  }

}

module.exports = DiscordCommandApples;
