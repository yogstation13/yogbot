const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandMentor extends DiscordCommand {

  constructor(subsystem) {
    super("mentor", "Mentor department of yogstation", undefined, subsystem, true);
  }
  		
  onRun(message, permissions, args) {
    var responses = [
		"https://cdn.discordapp.com/attachments/613105854173937776/722261658197819442/dreamseeker_2020-06-03_19-56-49.png",
		"https://cdn.discordapp.com/attachments/293085045743157248/722265835347116042/unknown.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722261906932367410/contained_t6.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262126823080036/9_crystals.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262680211030046/F_U_S_I_O_N_E_R.PNG",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262682736263218/F_U_S_I_O_N.PNG",
		"https://cdn.discordapp.com/attachments/613105854173937776/722266864771661995/dreamseeker_2020-03-19_22-30-52.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722269494692806747/Screenshot_57.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722269627861827614/mentorrevolution.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722271146979885056/basicallyops.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722267691490213929/mspaint_2020-02-23_03-21-51.png",
		"https://i.imgur.com/PlwTm0t.png",
	    	"https://cdn.discordapp.com/attachments/134720091576205312/889351204373667860/9e37yhqlcar31.png",
		//July 2020 Update goes here
		"https://cdn.discordapp.com/attachments/734475284446707753/734475502995243038/legion_engine.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734475635736576000/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734475652325179432/dreamseeker_2020-07-08_16-42-36.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734475862581444624/dreamseeker_2020-07-02_15-29-15.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734476023617290280/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734476119486496888/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734476347220688926/2020-06-24_02-15-35.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734476483669524540/Discord_2020-06-17_20-42-47.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734477245611114536/dreamseeker_2020-04-28_16-22-59.png",
		"https://i.gyazo.com/1cb02c34acf94e373034110a858936fe.png",
		"https://i.gyazo.com/187a71413b739e78a245dc36bc9843c6.png",
		"https://i.gyazo.com/58baa9d467853ce444ac838ce97b712c.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734478031502049391/ApplicationFrameHost_2020-04-03_18-27-43.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734478900977074306/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479014726729839/unknown.png",
		"https://i.imgflip.com/3mvj6b.jpg",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479070359978115/Discord_2020-03-21_00-50-48.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479184226680892/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479293089841172/Discord_2020-03-19_19-51-23.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479410438209576/dreamseeker_2020-03-06_01-36-07.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479479040245810/Tips_Fadora.png",
		"https://i.gyazo.com/b7bd36d0166ad2b04c7325399a5fd0ff.png",
		"https://i.gyazo.com/1699b0d6a860f8380447b711c9f6d791.png",
		"https://i.gyazo.com/10519c2f469e78ae9576a8984884287f.png",
		"https://i.gyazo.com/23954918ebb25ba42638af04f4363fc7.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734481106631524412/dreamseeker_2020-02-15_04-13-54.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734481575621951628/2020-02-10_23-32-11.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734481985732477008/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734483353713115287/Discord_2019-10-29_13-38-10.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734485872841326592/5vj5PGEsKt.gif",
		"https://cdn.discordapp.com/attachments/734475284446707753/734508105592995961/ss13_bigfuckingcarp.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734508255392301136/ss13_skewium.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734508295309623417/ss13_skub.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734508330898292796/ss13_golemtraps.PNG",
		"https://cdn.discordapp.com/attachments/734475284446707753/734532354915434566/FREEMINER_RESCUE.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734532409042665552/HobbleCrystal.png",
		//August 2020 update goes here.
		"https://cdn.discordapp.com/attachments/734475284446707753/734744951807541348/image0.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734744994333851708/image0.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734760343946919936/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734902093063913563/ss13_475goatcubesfinaledit.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734920287736299520/Discord_2020-07-20_19-50-17.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/735200184295882824/image0.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/736076686910685264/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/736081562755399780/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/736419384675008662/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/736971900319825970/image0.jpg",
		"https://cdn.discordapp.com/attachments/734475284446707753/736972365212155904/image0.jpg",
		"https://cdn.discordapp.com/attachments/734475284446707753/736972983209295994/image0.png",
		"https://images-ext-2.discordapp.net/external/jASYmLLTdqdG4uaSecNvwsSnovMdquVDLg_ygRzwSQ0/https/media.discordapp.net/attachments/134720091576205312/680288228418650126/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/737397857962688664/unknown.png",
		"https://i.gyazo.com/f6236e484122b554685730b84b2d073c.png",
		"https://media.discordapp.net/attachments/134720091576205312/737496806656573490/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/740461196653625384/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/737733504640745592/ohno.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/738040538615251095/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/739019341655441468/mspaint_2020-08-01_03-15-19.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/739414393510428692/void_gas.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/739618353953374279/ss13_atlasxenobiomoment.PNG",
		"https://cdn.discordapp.com/attachments/734475284446707753/739652352801243136/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/739687726080589874/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/739978122924916837/unknown.png",
		"https://i.imgur.com/zOtOQvV.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/740354501650939954/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/740786631384236102/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/741080606858805279/Png.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/742933471558893608/unknown.png",
		"https://i.gyazo.com/dd8c1ac5c161d9fa368bbe3550e8fbe2.png",
		"https://i.gyazo.com/79d17bac34ac7b6416b7fabb05877128.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/743434593570390016/1x1_SM_for_posting.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/743503840824787024/ss13_bowlgetscremated.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/743671213469204541/image0.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/744951805510942802/discordmentorsarentreal.PNG",
		"https://cdn.discordapp.com/attachments/734475284446707753/745802418045845605/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/746232195210936340/unknown.png",
		//September Update
		"https://cdn.discordapp.com/attachments/734475284446707753/747954233621479484/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/750903021340459058/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/750924492083167423/Screenshot_30.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/751578534706806784/mhonk.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/751878181077909564/dreamseeker_2020-09-05_14-37-33.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/752604251334639677/dreamseeker_4k1lcZxh2r.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/754005298934448158/ss13_yogurtspawnedmeonthesm.PNG",
		"https://cdn.discordapp.com/attachments/734475284446707753/754143761851875348/Mayo.ong.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/755288737994375318/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/755688793528336404/dreamseeker_2020-09-16_01-48-48.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/755867791919284586/discordbibbysucks.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/755960922903675000/ss13_ronanasksafunny.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/756656383583322122/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/756685334426681454/20200919_021545.jpg",
		"https://cdn.discordapp.com/attachments/734475284446707753/756729713803919500/basicallyyoucantjustshootaholeintomars.PNG",
		"https://cdn.discordapp.com/attachments/734475284446707753/757396560324591646/ss13_void.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/759271003821309992/ss13_hugboxingultimate.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/759648781703839754/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/759965242989477978/Discord_2020-09-27_22-25-23.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/759977324346474507/unknown.png",
		//October and November Update
		"https://cdn.discordapp.com/attachments/734475284446707753/761103282310873098/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/761952431272755260/2020-10-03_10_03_35-Yogstation_13_Main__Neckbear_Frontier_XXIV.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/762341681403920404/image0.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/762370914716221470/TF6ty84.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/762814604392136734/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/763667279580758026/dreamseeker_2020-10-08_01-04-09.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/763876448808468520/2020-10-08_18_17_33-Yogstation_13_Main__Hats_Metro_Gamma.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/766514223806808074/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/767179202545057792/unknown-23.png",
		"https://i.imgur.com/dEcE1T9.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/768299782912868382/Z.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/768725210315620362/unknown.png",
		"https://media.discordapp.net/attachments/240618354459672577/769046376025030656/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/769113290554343434/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/769246455641800754/discordmhelpcodersarefat.PNG",
		"https://cdn.discordapp.com/attachments/734475284446707753/769658878039556106/a468151f534ae3544a5dad0b6643fde0.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/769659556216963113/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/769673078556327976/unknown.png",
		"https://media.discordapp.net/attachments/758283474037112878/770810604645646336/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/770892837003722772/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/772875062599876648/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/773183804030189568/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/773621631364235314/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/774177356637536266/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/774496437307572264/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/775422450379784202/Sin_titulo.png",
	    	//March Update
	    	"https://media.discordapp.net/attachments/734475284446707753/826626004704559154/image0.png",
	    	"https://media.discordapp.net/attachments/734475284446707753/824401461781332008/unknown.png",
	    	"https://media.discordapp.net/attachments/734475284446707753/821270173386145792/unknown.png",
	    	"https://media.discordapp.net/attachments/734475284446707753/813471318040117298/unknown.png",
	    	"https://media.discordapp.net/attachments/734475284446707753/813074964391264256/unknown.png",
	    	"https://media.discordapp.net/attachments/734475284446707753/803104291430072340/unknown.png",
	        "https://cdn.discordapp.com/attachments/734475284446707753/858070044117827644/unknown.png", //Voice of God tasted good
	        "https://cdn.discordapp.com/attachments/734475284446707753/855932232399978536/Screenshot_20210619-150814.jpg", //What is wrong with mentors
	        "https://cdn.discordapp.com/attachments/734475284446707753/871772581164883988/unknown.png", //Lul Furry
	        "https://cdn.discordapp.com/attachments/734475284446707753/827343050195206164/unknown.png", //April Fools Applications
	        "https://cdn.discordapp.com/attachments/734475284446707753/826626004704559154/image0.png", //Baoimu is colorblind
	        "https://cdn.discordapp.com/attachments/734475284446707753/824401461781332008/unknown.png", //Supermatters are harmless
	        "https://cdn.discordapp.com/attachments/734475284446707753/813471318040117298/unknown.png", //Theos Mustard
	        "https://cdn.discordapp.com/attachments/734475284446707753/813074964391264256/unknown.png", //Always mhelp
	        "https://cdn.discordapp.com/attachments/734475284446707753/809849768595161108/ss13_THEPIPES.PNG", //Too many pipes
	        "https://cdn.discordapp.com/attachments/378318242906636288/807082553126551612/unknown.png", //Speak with the dummy
	        "https://cdn.discordapp.com/attachments/734475284446707753/806816158178213908/unknown.png", //Best Mentor
	        "https://cdn.discordapp.com/attachments/734475284446707753/803104291430072340/unknown.png", //Why'd you irradiate the shuttle
                "https://cdn.discordapp.com/attachments/734475284446707753/875103302013042729/unknown.png", //N3D6 is a complete and utter twat
	        "https://cdn.discordapp.com/attachments/734475284446707753/893512372436754462/image0.png", //Everyone is answering Skrem 7's mhelp
	        "https://cdn.discordapp.com/attachments/734475284446707753/903294489408466964/unknown.png", //Old mhelp
	        "https://cdn.discordapp.com/attachments/734475284446707753/917938535649124392/unknown.png", //Hey cuackles
	        "https://cdn.discordapp.com/attachments/734475284446707753/916231741868478485/unknown.png", //Cutting my arms with a toolbox
	        "https://cdn.discordapp.com/attachments/734475284446707753/914011832694493194/unknown.png", //Step 1: Die
	        "https://cdn.discordapp.com/attachments/734475284446707753/906794257002676284/unknown.png", //I killed your gf
	  ];	
	var response = responses[Math.floor(Math.random() * responses.length)];
	
	// Mentors get the funny cyan
	const embed = new Discord.RichEmbed()
		.setColor('#259e80') // Classic Mcyan
		.setTitle('Mentor Image') // Set to title whenever it is added
		.setImage(response)
		//.setFooter(author) // Uncomment when we have authors

    message.reply(embed);
  }

}

module.exports = DiscordCommandMentor;

//segmented by month in the event this list gets too big and needs to be bisected.
