const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandSpooder extends DiscordCommand {

    constructor(subsystem) {
        super();
		this.name = "spooder";
		this.description = "Pictures of the best dog";
		this.permission = undefined;
		this.subsystem = subsystem;
		this.hidden = true;
    }

    onRun(message, permissions, args) {
        var responses = [
			"https://media.discordapp.net/attachments/134720091576205312/731173492078280804/image0.jpg",
			"https://media.discordapp.net/attachments/134720091576205312/769970524179922965/image0.jpg",
			"https://media.discordapp.net/attachments/134720091576205312/763375965694066740/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/781210921660841994/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/779862242514042891/20200625_134610.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/779861806235123732/20200627_133059.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/779861697119780884/20201103_163333.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/779861540181770280/20200816_184858.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/779859420578316288/20200727_190706.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/778505263929753621/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/778301505954119690/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/777782052179017748/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/776801202797019186/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/776800775929462794/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/776800401068130324/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/776800401408262234/image1.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/776800401768841246/image2.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/775739405968080936/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/774307513909641246/bruh_moment.PNG",
			"https://cdn.discordapp.com/attachments/134720091576205312/773803389540761640/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/773299091668467742/20201103_163344.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/773028962925805588/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/772156323801333830/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/770652852245889034/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/770634863048523776/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/769969717565456414/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/766179399577370634/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/766178649820758067/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/761976896224231434/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/758926442745823232/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/758926095017050132/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/746231257880330330/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/719651914702389388/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/743323057136992376/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/742914849301856337/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/740672784509960292/20200502_141353.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/739523229944905850/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/739520731892940810/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/738415435283693608/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/738411263067160676/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/736544874551181332/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/736029357684031488/20200625_134452.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/735726121475244122/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/733919222773842021/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/730472639319113738/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/729757473300283522/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/728635183330492506/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/726990091171397663/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/725768082999476344/20200625_134156.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/725215553429438524/20200624_010615.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/724829936438870087/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/723572154163134534/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/720023648626278520/20200609_171041.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/719431627054383134/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/719431312879910949/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/719428567187980288/image0.jpg",
			"https://cdn.discordapp.com/attachments/134720091576205312/719427763538493500/image0.jpg"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
        const embed = new Discord.RichEmbed()
          .setColor('#'+randomColor) // Random Color
          .setTitle('The best dog') // Set to title whenever it is added
          .setImage(response)
          //.setFooter(author) // Uncomment when we have authors

        message.channel.send(embed);
    }

}

module.exports = DiscordCommandSpooder;
