const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandWiki extends DiscordCommand {

  constructor(subsystem) {
    super("wiki", "Wiki department of yogstation", undefined, subsystem, true);
  }
  		
  onRun(message, permissions, args) {
    var responses = [
        "https://cdn.discordapp.com/attachments/134720091576205312/734963600321675355/silencementor.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734870404208001164/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734870837823406110/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734870208241729577/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734870751122817064/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734869376850985000/wikibanner.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734851685565857824/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734851342329315448/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734850786185576458/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734850422258270288/unknown.png",
        "https://i.imgur.com/ZVew4B1.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734850150228426873/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734849802378018816/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734849751664689202/yu8kfSG.png",
        "https://cdn.discordapp.com/attachments/628963669887156224/638934113373388800/Screenshot_20191030-1053232.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734848490722820096/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734847494801850408/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734847152756621434/unknown.png",
        "https://media.discordapp.net/attachments/628963669887156224/717916631858151514/image0.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734846208924844132/unknown.png",
        "https://i.imgur.com/RYM4zIO.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734845830900744202/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734846144701792256/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734844866583986256/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734844514069643294/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734844202998956076/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734844239200124938/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734844114482495518/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734844019624116274/unknown.png",
        "https://cdn.discordapp.com/attachments/607402553143197696/734843632812818472/unknown.png"
	];	
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandWiki;
