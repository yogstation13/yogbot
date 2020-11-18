const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandSwiss extends DiscordCommand {

  constructor(subsystem) {
    super("swiss", "Swiss bread", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://i.imgur.com/XE514GF.jpg",
		"https://i.imgur.com/S9pTqVI.jpg",
		"https://i.imgur.com/pcu7ddJ.png",
		"https://i.imgur.com/oScG9hC.jpg",
		"https://i.imgur.com/a3Xkkgw.jpg",
		"https://i.imgur.com/BhNytz6.jpg",
		"https://i.imgur.com/Z31mJ3k.jpg",
		"https://i.imgur.com/nMNBnQW.jpg",
		"https://i.imgur.com/cK6tSAQ.jpg",
		"https://i.imgur.com/yJ3LIGn.jpg",
		"https://i.imgur.com/Ow2JgEs.jpg",
		"https://i.imgur.com/K4CTM4C.jpg",
		"https://i.imgur.com/ZuatCXk.jpg",
		"https://i.imgur.com/zNzh4eq.gif",
		"https://i.imgur.com/8y5Lk4k.jpg",
		"https://i.imgur.com/Y9oahxm.jpg",
		"https://i.imgur.com/oyqV0PZ.jpg",
		"https://i.imgur.com/Y9oahxm.jpg",
		"https://i.imgur.com/qSWtHaq.jpg",
		"https://i.imgur.com/YwmS6sP.jpg",
		"https://media.discordapp.net/attachments/293085045743157248/721906067876872233/unknown.png",
		"https://cdn.discordapp.com/attachments/293085045743157248/715967055777759262/unknown.png",
		"https://i.imgur.com/AL4rIhD.png",
		"https://i.imgur.com/hIJmMkA.jpg",
		"https://i.imgur.com/QPpz6jx.png",
		"https://i.imgur.com/D7JlPg6.jpg",
		"https://i.imgur.com/dqstIYp.png",
		"https://i.imgur.com/6F0jwNU.jpg",
		"https://i.imgur.com/SVWdHbY.jpg",
		"https://i.imgur.com/xjUGdw7.jpg",
		"https://i.imgur.com/dOx9elW.png",
		"https://cdn.discordapp.com/attachments/134720091576205312/716381796694229023/unknown.png",
		"https://i.imgur.com/r24De1h.jpg",
		//November Update
		"https://cdn.discordapp.com/attachments/734475284446707753/767555666322915348/white_supremacy.png"
	];
	var response = responses[Math.floor(Math.random() * responses.length)];
	var randomColor = Math.floor(Math.random()*16777215).toString(16);

	const embed = new Discord.RichEmbed()
	.setColor('#'+randomColor) // Random Color
	.setTitle('Swiss Image') // Set to title whenever it is added
	.setImage(response)
	//.setFooter(author) // Uncomment when we have authors

    message.reply(embed);
  }

}

module.exports = DiscordCommandSwiss;
