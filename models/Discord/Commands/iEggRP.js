const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandEggrp extends DiscordCommand {

  constructor(subsystem) {
    super();
	this.name = "eggrp";
	this.description = "Pictures of the Egg Overlord";
	this.permission = undefined;
	this.subsystem = subsystem;
	this.hidden = true;
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://cdn.discordapp.com/attachments/458282555284783114/572244783452651535/20181004_125250.jpg",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244790310207488/aemi.jpg",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244793640615937/are-eggs-actually-healthy-video.jpg",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244806890160133/Endaru.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244819905085470/image0.jpg",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244819737313312/EGG.jpg",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244843737120781/FillyEgg.jpg",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244886573809676/KitchenEGGRp.png",
	    "https://cdn.discordapp.com/attachments/293085045743157248/724392616984182894/unknown.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244896736608276/Hanako.jpg",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244899382951966/EggRp.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244911856812032/pickled-eggs-vertical-a-2000.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244921013108738/RobloxScreenShot20181010_090201027.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244918400057355/image0.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244922430783488/TheOrigin.jpg",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244942370504714/image0.gif",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244948464697356/unknown.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244968337440787/DannyEgg.gif",
		"https://cdn.discordapp.com/attachments/437332037649825792/664074732731105281/IMG_20200107_044541.jpg",
		"https://cdn.discordapp.com/attachments/134720091576205312/747587010256175245/egg.png",
		//September Update Goes here
		"https://cdn.discordapp.com/attachments/734475284446707753/756286634852352152/dreamseeker_2020-09-17_17-17-21.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/758277438764744704/image0.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/761010462766399498/unknown-24.png",
	    "https://cdn.discordapp.com/attachments/734475284446707753/806941530915864586/unknown.png" //Egg counter
	];
	var response = responses[Math.floor(Math.random() * responses.length)];
	var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
	const embed = new Discord.RichEmbed()
		.setColor('#'+randomColor) // Random Color
		.setTitle('EggRP Image') // Set to title whenever it is added
		.setImage(response)
		//.setFooter(author) // Uncomment when we have authors
		
    message.reply(embed);
  }

}

module.exports = DiscordCommandEggrp;
