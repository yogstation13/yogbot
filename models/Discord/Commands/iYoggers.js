const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandYoggers extends DiscordCommand {

  constructor(subsystem) {
    super();
	this.name = "yoggers";
	this.description = "Random shit that happens";
	this.permission = undefined;
	this.subsystem = subsystem;
	this.hidden = true;
  }
  		
  onRun(message, permissions, args) {
    var responses = [
		"https://i.gyazo.com/5830b055888aade28628c1796bf14044.png",
		"https://i.gyazo.com/1769193d7508550895179c3d597e54fb.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734532488478851142/Screenshot_4.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734532569961463878/fatal_error.png",
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
		"https://cdn.discordapp.com/attachments/734475284446707753/734482509508902953/dreamseeker_2020-01-09_01-45-15.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/740673946461929532/db4cf98.jpg",
		"https://cdn.discordapp.com/attachments/734475284446707753/734475932781510746/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734477986304360549/yeet.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/741736343075553470/unknown.png",
		"https://cdn.discordapp.com/attachments/514432706591850506/742142394077544538/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/750774381780795412/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/745835827497533520/unknown.png",
		"https://i.gyazo.com/b07cf72d85c2aad856a6146ea5305953.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734480812140920832/dreamseeker_2020-02-17_23-32-18.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/747346964282081280/msedge_2020-08-23_02-53-08.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/757768828603203685/ash_whooping.jpg",
		"https://cdn.discordapp.com/attachments/734475284446707753/760351126092251136/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/735289852832251935/3.6.PNG",
		"https://cdn.discordapp.com/attachments/734475284446707753/741738232177229904/dreamseeker_2020-08-08_14-40-08.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/762537383840317460/unknown.png",
		"https://cdn.discordapp.com/attachments/134720091576205312/734855157837332600/xenoh.png",
		"https://cdn.discordapp.com/attachments/134720091576205312/734599512890277898/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/768725068393611296/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/770375580855697428/unknown.png",
		"https://cdn.discordapp.com/attachments/134722036353204224/722263699527565312/coggers.png",
		"https://media.discordapp.net/attachments/734475284446707753/825033507868639262/image0.png",
		"https://media.discordapp.net/attachments/734475284446707753/820059679178358814/image0.png",
		"https://media.discordapp.net/attachments/734475284446707753/820043601026875412/unknown.png",
		"https://media.discordapp.net/attachments/734475284446707753/807753591070130226/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/868519606023770182/unknown.png", //AI's full lawset
        "https://cdn.discordapp.com/attachments/734475284446707753/863056207010332722/image0.png", //Body Blockage
        "https://cdn.discordapp.com/attachments/734475284446707753/854505018376192060/unknown.png", //MC Server Crashing
        "https://cdn.discordapp.com/attachments/734475284446707753/831232672491372574/unknown.png", //Lizard Plushie Boss
        "https://cdn.discordapp.com/attachments/734475284446707753/830943664334700606/a186e67642003b4f0fa6f7e71dd89591.png", //Xenobio Flames
        "https://cdn.discordapp.com/attachments/734475284446707753/830542381806911508/image0.png", //Ban mqiib
        "https://cdn.discordapp.com/attachments/734475284446707753/829873801910943824/unknown.png", //AI Law 0 in Law 5 and 6
        "https://cdn.discordapp.com/attachments/734475284446707753/825033507868639262/image0.png", //Alt F4 to strafe
        "https://cdn.discordapp.com/attachments/734475284446707753/820059679178358814/image0.png", //"epic yoggers" IC
        "https://cdn.discordapp.com/attachments/734475284446707753/820043601026875412/unknown.png", //Slings are hot
        "https://cdn.discordapp.com/attachments/734475284446707753/819635780807950376/unknown.png", //Show factory
        "https://cdn.discordapp.com/attachments/734475284446707753/807753591070130226/unknown.png", //Blood Cult Pod
        "https://cdn.discordapp.com/attachments/734475284446707753/805626489978224650/unknown.png", //Nerd is not a valid integer
        "https://cdn.discordapp.com/attachments/734475284446707753/801260717973831720/dreamseeker_2021-01-19_19-18-46.png", //Heretic Art
        "https://cdn.discordapp.com/attachments/734475284446707753/797272738779234324/5b704d04150bc69cd943665017d46eba.png" //Negative Hours
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

module.exports = DiscordCommandYoggers;
