const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandCoder extends DiscordCommand {

    constructor(subsystem) {
        super("coder", "dumb stuff the dev team says", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
        "https://cdn.discordapp.com/attachments/347045440958627841/766286538107519006/unknown.png",
        "https://cdn.discordapp.com/attachments/347045440958627841/766286291175735356/unknown.png",
        "https://cdn.discordapp.com/attachments/347045440958627841/766284877850476544/unknown.png",
        "https://cdn.discordapp.com/attachments/347045440958627841/766077319679967282/unknown.png",
        "https://cdn.discordapp.com/attachments/205784753352343552/768234096244817980/unknown.png",
        "https://cdn.discordapp.com/attachments/347045440958627841/763421934431895632/Capture_2020-10-07-11-25-27.png",
        "https://cdn.discordapp.com/attachments/710261756710354985/767046065336614932/Capture_2020-10-17-11-26-26.png",
        "https://cdn.discordapp.com/attachments/710261756710354985/767045106884018196/unknown.png",
        "https://cdn.discordapp.com/attachments/710261756710354985/767044874595598356/Capture_2020-10-17-11-15-38.png",
        "https://tenor.com/view/dog-cute-happy-samoyed-puppy-gif-14818829",
        "https://cdn.discordapp.com/attachments/205784753352343552/768561221300387870/unknown.png",
        "https://cdn.discordapp.com/attachments/134720091576205312/768629149862199306/unknown.png",
        "https://cdn.discordapp.com/attachments/134720091576205312/768629387267801088/unknown.png",
        "https://cdn.discordapp.com/attachments/134720091576205312/768629825392607242/unknown.png",
        //November update
        "https://cdn.discordapp.com/attachments/734475284446707753/767680432945758208/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/768683122845417482/eat_you_up.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/768685203089784842/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/768832768947388416/Capture_2020-10-22-09-45-47.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/768851782780059728/image0.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/768869609347612772/20201022_121231.jpg",
        "https://cdn.discordapp.com/attachments/734475284446707753/768887587988832307/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/769092646768476190/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/770295467492900874/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/770659824135831562/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/772700667969011712/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/772885346199011358/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/774083235847077929/image0.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/775784036470751232/image0.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/776741617053859850/unknown.png",
        "https://i.gyazo.com/566dd8a79f7aa374d7b248823d50a28a.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/734482071103471676/dreamseeker_2020-01-27_21-36-54.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/734508169178644500/ss13_alexkaraheal.PNG",
        "https://cdn.discordapp.com/attachments/734475284446707753/734531895299276830/halfadoor.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/734860649758195782/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/735041980182036500/discordtheosbeerebase.PNG",
        "https://cdn.discordapp.com/attachments/734475284446707753/748792022017507399/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/751978462050517073/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/752757100781764608/monster_being_monster.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/760594369312718879/unknown.png",
	      "https://i.gyazo.com/e769a11cad7bbd112de2db9c1994ff77.png",
	      "https://cdn.discordapp.com/attachments/734475284446707753/734476179167510578/dreamseeker_2020-06-25_16-42-07.png",
	      "https://cdn.discordapp.com/attachments/134720091576205312/780843381941075968/unknown.png", // FileTypes.jpg
        "https://cdn.discordapp.com/attachments/734475284446707753/772916637190979664/unknown.png"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
        const embed = new Discord.RichEmbed()
            .setColor('#'+randomColor) // Random Color
            .setTitle('Coder Image') // Set to title whenever it is added
            .setImage(response)
            //.setFooter(author) // Uncomment when we have authors

        message.channel.send(embed);
    }

}

module.exports = DiscordCommandCoder;
