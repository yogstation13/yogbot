const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandCoder extends DiscordCommand {

    constructor(subsystem) {
        super("jamie", "dumb stuff from jamie", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
				"https://media.discordapp.net/attachments/423761888309018624/785992140118294548/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785991477406203914/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785991187504431154/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785990992750706688/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785990717989978172/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785990361129943040/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785990219483840552/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785989933931561011/unknown.png",
				"https://media.discordapp.net/attachments/205784753352343552/767094905272139886/Capture_2020-10-17-14-41-13.png",
				"https://media.discordapp.net/attachments/423761888309018624/785989660517466172/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785989518687469648/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785989222565150740/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785989031417741332/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785988786634752000/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785988630522101790/unknown.png",
				"https://cdn.discordapp.com/attachments/423761888309018624/785988488230862848/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785988309636612106/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785988037360222238/unknown.png",
				"https://media.discordapp.net/attachments/205784753352343552/776583088704323636/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785987576266752030/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785986925084672040/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785986613921841152/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785986486754607124/unknown.png",
				"https://media.discordapp.net/attachments/423761888309018624/785986321918984242/unknown.png",
				"https://cdn.discordapp.com/attachments/423761888309018624/785986121896427530/unknown.png",
				"https://cdn.discordapp.com/attachments/205784753352343552/785862579129810955/unknown.png",
        "https://cdn.discordapp.com/attachments/347045440958627841/763421934431895632/Capture_2020-10-07-11-25-27.png",
        "https://cdn.discordapp.com/attachments/710261756710354985/767044874595598356/Capture_2020-10-17-11-15-38.png",
        "https://cdn.discordapp.com/attachments/205784753352343552/768561221300387870/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/768887587988832307/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/772700667969011712/unknown.png"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
        const embed = new Discord.RichEmbed()
            .setColor('#'+randomColor) // Random Color
            .setTitle('Jamie Image') // Set to title whenever it is added
            .setImage(response)
            //.setFooter(author) // Uncomment when we have authors

        message.channel.send(embed);
    }

}

module.exports = DiscordCommandJamie;
