const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandPlayers extends DiscordCommand {

  constructor(subsystem) {
    super("players", "Random shit that happens", undefined, subsystem, true);
  }
  		
  onRun(message, permissions, args) {
    var responses = [
	"https://i.gyazo.com/5830b055888aade28628c1796bf14044.png",
	"https://i.gyazo.com/1769193d7508550895179c3d597e54fb.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/734532488478851142/Screenshot_4.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/734532569961463878/fatal_error.png",
	"https://cdn.discordapp.com/attachments/134720091576205312/734599512890277898/unknown.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/734644410909982750/aZ5RfKI.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/734744943406612541/image0.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/735028954259521546/ss13_NTPhonksuptheshuttle.PNG",
	"https://cdn.discordapp.com/attachments/734475284446707753/735289662087757824/GOD.PNG",
	"https://cdn.discordapp.com/attachments/734475284446707753/735556743865565267/Discord_gmXSn7s1aA.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/736973311590006894/image0.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/736973563013234779/image0.jpg",
	"https://media.discordapp.net/attachments/134720091576205312/635009805064339457/unknown.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/737973483887394866/unknown.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/738042322457198682/Discord_pm6OOIN0K9.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/738999672474959932/unknown.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/739741233433280573/screwdrivers.PNG",
	"https://cdn.discordapp.com/attachments/466200109361790996/740325880597053450/unknown.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/740673946461929532/db4cf98.jpg",
	"https://cdn.discordapp.com/attachments/734475284446707753/741736343075553470/unknown.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/745835827497533520/unknown.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/747346964282081280/msedge_2020-08-23_02-53-08.png",
	"https://forums.yogstation.net/index.php?threads/gibong-report-by-aphielanisn.20220/#post-171675",
	"https://cdn.discordapp.com/attachments/734475284446707753/757768828603203685/ash_whooping.jpg",
	"https://cdn.discordapp.com/attachments/734475284446707753/760351126092251136/unknown.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/762537383840317460/unknown.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/768725068393611296/unknown.png",
	"https://cdn.discordapp.com/attachments/734475284446707753/770375580855697428/unknown.png",
	"https://cdn.discordapp.com/attachments/134722036353204224/722263699527565312/coggers.png"
	  ];	
	var response = responses[Math.floor(Math.random() * responses.length)];
	
	const embed = new Discord.RichEmbed()
		.setColor('#fffff') // white
		.setTitle('Playerbase Image') // Set to title whenever it is added
		.setImage(response)
		//.setFooter(author) // Uncomment when we have authors

    message.reply(embed);
  }

}

module.exports = DiscordCommandPlayers;
