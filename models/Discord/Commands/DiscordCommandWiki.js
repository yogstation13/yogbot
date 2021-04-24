const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

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
        "https://cdn.discordapp.com/attachments/607402553143197696/734843632812818472/unknown.png",
        //August update goes here
        "https://cdn.discordapp.com/attachments/607402553143197696/737398836443742289/mBreadMonkey.jpg",
        "https://cdn.discordapp.com/attachments/731402515970654233/735757838634451004/maybe_you_say..PNG",
        "https://cdn.discordapp.com/attachments/734475284446707753/735899938554249226/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/736304632909004870/Untitled.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/736304669768548482/uLvLwzf.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/736304700458270770/C3bbqmd.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/736304724340637696/1pChMY0.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/736304757303541820/n5dMiKT.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/736304783471935609/N1TGs7U.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/736304811539955783/eo59YKl.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/736304845740441680/lGdqCvI.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/736304874119102544/xZpXlN2.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/736304903424573450/SogNNoN.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/738444411226030090/ApplicationFrameHost_WqQTNR2KcL.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/738533939047825428/Discord_2020-07-30_19-09-17.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/739509921908916255/fzxbQO2.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/739509995296784484/dwIqBr8.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/739510144039125033/svGEufI.png",
        "https://i.imgur.com/fdgoo3A.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/741353085179265067/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/745649688945885264/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/745726429605527572/Meme_Wiki.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/746123876928454686/unknown.png",
        //September update goes here
        "https://cdn.discordapp.com/attachments/734475284446707753/750754862441955399/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/759714228524941343/angry_morder.png",
        //October and November update goes here
        "https://cdn.discordapp.com/attachments/734475284446707753/762465628635791360/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/767629949146103858/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/767860510430593035/1l3g3o2.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/767889520233676801/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/769183799073570846/Capture_2020-10-22-09-53-17.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/769667343541338122/unknown.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/742791230072553602/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/776247641343524864/image0.png",
	"https://cdn.discordapp.com/attachments/134720091576205312/835372563366019103/Not_Yet.png"
	];	
	var response = responses[Math.floor(Math.random() * responses.length)];
	  
	const embed = new Discord.RichEmbed()
		.setColor('#ad1457') // M > W
		.setTitle('Wiki Image') // Set to title whenever it is added
		.setImage(response)
		//.setFooter(author) // Uncomment when we have authors
	message.channel.send(embed);
  }

}

module.exports = DiscordCommandWiki;
