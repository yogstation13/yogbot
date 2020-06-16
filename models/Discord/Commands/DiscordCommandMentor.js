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
		"https://cdn.discordapp.com/attachments/613105854173937776/722262821110284328/fart_canister.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262829486440580/fart_fetish_2.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262840744083516/fart_fetish_3.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722262859815583846/fart_fetish.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722263123062554684/dreamseeker_2020-05-04_02-16-13.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722264079225323570/dreamseeker_2020-04-02_02-39-36.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722264427004690467/unknown.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722264898708570172/80oxjajrdpo41.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722265156377378816/carpets.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722265593461604372/dreamseeker_2020-03-31_21-54-51.png",
		"https://cdn.discordapp.com/attachments/613105854173937776/722266864771661995/dreamseeker_2020-03-19_22-30-52.png"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandMentor;
