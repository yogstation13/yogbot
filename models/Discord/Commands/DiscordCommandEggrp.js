const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandEggrp extends DiscordCommand {

  constructor(subsystem) {
    super("Eggrp", "Pictures of the Egg Overlord", undefined, subsystem, true);
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
		"https://cdn.discordapp.com/attachments/458282555284783114/572244896736608276/Hanako.jpg",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244899382951966/EggRp.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244911856812032/pickled-eggs-vertical-a-2000.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244921013108738/RobloxScreenShot20181010_090201027.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244918400057355/image0.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244922430783488/TheOrigin.jpg",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244942370504714/image0.gif",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244948464697356/unknown.png",
		"https://cdn.discordapp.com/attachments/458282555284783114/572244968337440787/DannyEgg.gif",
		"https://cdn.discordapp.com/attachments/437332037649825792/664074732731105281/IMG_20200107_044541.jpg"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandEggrp;
