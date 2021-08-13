const DiscordImageCommand = require('../../DiscordImageCommand.js');

class DiscordCommandMoja extends DiscordImageCommand {

	constructor(subsystem) {
		super();
		this.name = "moja";
		this.description = "Wise words beyond mortal comprehension";
		this.subsystem = subsystem;
		this.title = "Moja Image";
		this.images = [
			"https://cdn.discordapp.com/attachments/734475284446707753/758262836869857300/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758262871200366612/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758262931279708170/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758262993002692608/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263058430296074/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263105204518922/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263164940058664/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263218979340318/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263276613795880/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263360801996831/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263428342611968/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263470117355560/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263530969104394/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263630197424148/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263745985773588/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263778721792030/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263886427455538/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758263944790933514/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264013947404288/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264071765884989/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264135401865236/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264200157593600/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264299645960272/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264358995230740/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264444236333056/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264516282155028/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264570547535882/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264657525342208/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264743475019796/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264779910676480/ss13_yogurtgoescrazy.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264817252696064/image0.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264851062587422/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264927169019944/Clown_shuttle.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758264960337313802/mcdonalds.jpg",
			"https://cdn.discordapp.com/attachments/734475284446707753/758265102234943488/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/758265354224271370/Moja.gif",
			//September update goes here
			"https://cdn.discordapp.com/attachments/734475284446707753/759871199382732863/unknown.png",
			"https://cdn.discordapp.com/attachments/377098618974240768/760312786848317461/unknown.png",
			"https://cdn.discordapp.com/attachments/377098618974240768/760312928984891492/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/760910981274009610/unknown.png",
			//October, November update goes here
			"https://cdn.discordapp.com/attachments/734475284446707753/762763851862638652/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765341351474495488/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765341511042465812/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765341768341782528/IMG_20200504_121236.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765341979818459186/Resized_20200419_190930.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765342321348182036/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765342439296073728/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765342541398147092/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765342625262993408/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765343536743710740/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765343662410170388/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344108616876072/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344234537615400/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344315135229992/image0.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344362204758066/4s8l4ofjfep41.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344387021930527/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344430952808488/uvmb3arj3uj41.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344458774282240/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344507356643328/image0-22.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344538436567091/secbeatwife.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344562913869824/bestmimo.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344668476768296/20200124_195433.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344816908992512/20191116_135130.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344901818744893/Resized_20191028_114649.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765344942188003388/3w8zrfws3p521.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765345053581246474/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765345124196548618/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765345198200717382/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765345382380339210/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765345441600241664/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765345498017693716/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765345619568361502/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765345756248145920/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765345875126911016/y1bz9ilhr0031.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765345931163729961/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765347459877830686/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/765347511551524884/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/767170995441500170/YOGBEATHIPPIE.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/767171116908544000/Mime_Shuttle.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/767171253492121640/ahelp.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/767486641484857444/syX4vlf.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/767821101072908398/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/767821705816047687/moja.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/767905892866850816/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/768895330044346408/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/769887660990398474/image0.jpg",
			"https://cdn.discordapp.com/attachments/734475284446707753/770289769795551232/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/771624243401588757/Screenshot_20201030-0136422.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/772523426647900160/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/772886870774251571/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/773263970370977822/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/773469790119526420/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/774000278210084874/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/774001975549100032/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/774732985710280784/image0.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/815362585029246976/image0.png" //Lettuce is 900 calories
		];
	}
}

module.exports = DiscordCommandMoja;

/*
:::::::::::::::::oyyyhhyyhhhhyhhyyyyhhyyyyyyyyyyyh
:::::::::::::::::/o++hdo/+o+++/+sssoohyyyyyyhhhhyh
::::::::::::::::::o//shs+/+oo+//++///+syhhhhhhdhhh
::::::::::::::::::++++/::/o+/::::/+////+yhyyyhddhh
::::::::::::::::::+oo/:::++:::::::/o////shyyyhhddd
::::::::::::::::::+so/:::+/:::::::/o////+syyyyhddd
:::::::::::::::://oso+:+++o+o+//::oo/:///+++++ohhd
+++++/////////////oooo/::/o+/:--:/+//////////oyhdd
hdddddhhhhhs+/////////++oso+///////////////:/+hdmd
+++++++++oooooossssoo++///+++///////////////:/smNN
///////+ossssssssssssssso+//++////////////////omNd
/////+osssssssssssssssssssso//////////////////ohs+
///+ossssssssssssssssssssssyy+////////////////syo+
//oyysssssssssssssssssyyyysssy+/////////////+o++o+
/osyyssssssssssssssyysssssssssyo//+/+o////+o+/////
syyysssssssssssssyyssssssssssssy+/oos+ssso+/::::::
osyyssssssssssssyysssssssssssssss/+yo+ssyss+::::::
+yyyssssssssssssysssssssssssssssy+/soossooss/:::::
+ossssssssssssyyysssssssssssssssyo/osooooooy+:::::
ysssssssssssssssyssssssssssssssyy+/osooooosyo+//::
sssssssssoosso++ssysssssssssyyys+//sooosyssooooo/:
/+ssssso/:/+//+ossyyysssssssyso///oysssssooooooos/
/://+oooo/::+ssssssssssssssys++++osooooooooooooos+
::::::::////++oooooooooo+////+sssoooooooooooooooso
:::::::::::::::::::::::::::::+sooooooooosysoooooos
:::::::::::::::::::::::::::::oooooooooooosyooooooo
*/