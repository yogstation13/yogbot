const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandMentor extends DiscordCommand {

  constructor(subsystem) {
    super("mentor", "Mentor department of yogstation", undefined, subsystem, true);
  }
  		
  onRun(message, permissions, args) {
    var responses = [
		"https://cdn.discordapp.com/attachments/613105854173937776/722261023071141888/byrne-etal-troubled-sa-must-take-may-day-seriously.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722261114049789972/Art_Collection_Hive_Mind.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722261410259664966/53281670-bfda7600-36fa-11e9-9cb8-0119ec3b698c.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722261538253307955/dreamseeker_2020-06-06_19-11-08.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722261658197819442/dreamseeker_2020-06-03_19-56-49.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722260679075168347/unknown.png",
		"https://cdn.discordapp.com/attachments/293085045743157248/722265835347116042/unknown.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722261901073186846/Screen20Shot202016-11-0320at204.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722261906932367410/contained_t6.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262042953908244/plant.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262126823080036/9_crystals.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262680211030046/F_U_S_I_O_N_E_R.PNG",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262682736263218/F_U_S_I_O_N.PNG",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262829486440580/fart_fetish_2.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262840744083516/fart_fetish_3.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262859815583846/fart_fetish.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722263123062554684/dreamseeker_2020-05-04_02-16-13.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722264079225323570/dreamseeker_2020-04-02_02-39-36.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722264427004690467/unknown.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722264898708570172/80oxjajrdpo41.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722265156377378816/carpets.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722265593461604372/dreamseeker_2020-03-31_21-54-51.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722266864771661995/dreamseeker_2020-03-19_22-30-52.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722269494692806747/Screenshot_57.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722269627861827614/mentorrevolution.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722270066116263946/Screenshot_5.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722271146979885056/basicallyops.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722271920787030026/Screenshot_109.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722272766363041894/Screenshot_107.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722273439465078854/Scienehasgonetoofar.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722273689743130715/dreamseeker_2020-02-19_23-52-29.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722267691490213929/mspaint_2020-02-23_03-21-51.png",
		"https://cdn.discordapp.com/attachments/134722036353204224/722263699527565312/coggers.png",
		"https://i.imgur.com/PlwTm0t.png",
		//July 2020 Update goes here
		"https://cdn.discordapp.com/attachments/734475284446707753/734475502995243038/legion_engine.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734475635736576000/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734475652325179432/dreamseeker_2020-07-08_16-42-36.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734475862581444624/dreamseeker_2020-07-02_15-29-15.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734475932781510746/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734476023617290280/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734476038469451806/dreamseeker_2020-06-30_16-20-15.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734476119486496888/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734476179167510578/dreamseeker_2020-06-25_16-42-07.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734476238822834326/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734476347220688926/2020-06-24_02-15-35.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734476483669524540/Discord_2020-06-17_20-42-47.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734477245611114536/dreamseeker_2020-04-28_16-22-59.png",
		"https://i.gyazo.com/1cb02c34acf94e373034110a858936fe.png",
		"https://i.gyazo.com/187a71413b739e78a245dc36bc9843c6.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/734476893994221588/HAPPY..PNG",
		"https://i.gyazo.com/c44302e526d4f1a3909232bf3f8cdfe1.png",
		"https://i.gyazo.com/e769a11cad7bbd112de2db9c1994ff77.png",
		"https://i.gyazo.com/58baa9d467853ce444ac838ce97b712c.png",
		"https://i.gyazo.com/566dd8a79f7aa374d7b248823d50a28a.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734477986304360549/yeet.png",
		"https://i.gyazo.com/5830b055888aade28628c1796bf14044.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734478031502049391/ApplicationFrameHost_2020-04-03_18-27-43.png",
		"https://i.gyazo.com/f216f767bc9f23bae42eadb9707ff248.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734478900977074306/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479014726729839/unknown.png",
		"https://i.imgflip.com/3mvj6b.jpg",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479070359978115/Discord_2020-03-21_00-50-48.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479184226680892/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479293089841172/Discord_2020-03-19_19-51-23.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479410438209576/dreamseeker_2020-03-06_01-36-07.png",
		"https://previews.123rf.com/images/ylivdesign/ylivdesign1710/ylivdesign171005024/87727438-letter-m-bread-icon-cartoon-style.jpg",
		"https://cdn.discordapp.com/attachments/734475284446707753/734479479040245810/Tips_Fadora.png",
		"https://i.gyazo.com/b7bd36d0166ad2b04c7325399a5fd0ff.png",
		"https://i.gyazo.com/1699b0d6a860f8380447b711c9f6d791.png",
		"https://i.gyazo.com/10519c2f469e78ae9576a8984884287f.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734480812140920832/dreamseeker_2020-02-17_23-32-18.png",
		"https://i.gyazo.com/1769193d7508550895179c3d597e54fb.png",
		"https://i.gyazo.com/23954918ebb25ba42638af04f4363fc7.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734481106631524412/dreamseeker_2020-02-15_04-13-54.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734481190270271658/mspaint_2020-02-14_17-57-50.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734481575621951628/2020-02-10_23-32-11.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734481985732477008/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734482071103471676/dreamseeker_2020-01-27_21-36-54.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734482509508902953/dreamseeker_2020-01-09_01-45-15.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734483353713115287/Discord_2019-10-29_13-38-10.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734483525637767199/ApplicationFrameHost_2019-10-27_13-54-39.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/734485872841326592/5vj5PGEsKt.gif"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandMentor;

//segmented by month in the event this list gets too big and needs to be bisected.