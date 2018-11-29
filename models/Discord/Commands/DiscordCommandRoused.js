const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandRoused extends DiscordCommand {

  constructor(subsystem) {
    super("roused", "To bring out of sleep; awaken. Cause to feel angry or excited.", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://i.imgur.com/jgjJTOA.png",
		"https://i.imgur.com/Ylk64Ba.png",
		"https://i.imgur.com/dWbIcWk.png",
		"https://i.imgur.com/oxmatkO.png",
		"https://i.imgur.com/Ids6U6X.png",
		"https://i.imgur.com/VwVwPmK.png",
		"https://i.imgur.com/Iqtn9G6.png",
		"https://i.imgur.com/idvnk9N.png",
		"https://i.imgur.com/RVEweUN.png",
		"https://i.imgur.com/fhFjB9w.png",
		"https://i.imgur.com/9LghwL9.png",
		"https://i.imgur.com/IuSaVcJ.png",
		"https://i.imgur.com/hu5sLrn.png",
		"https://i.imgur.com/jx9gYSu.png",
		"https://i.imgur.com/fpjoeDf.png",
		"https://i.imgur.com/UqfTmTe.png",
		"https://i.imgur.com/z5OaYXJ.png",
		"https://i.imgur.com/oK1agDi.png",
		"https://i.imgur.com/LisnHT3.png",
		"https://i.imgur.com/IhmsDwA.png",
		"https://i.imgur.com/8xXYWv0.png",
		"https://i.imgur.com/XgIWmx1.png",
		"https://i.imgur.com/3NMRHBq.png",
		"https://i.imgur.com/4P4cHtk.png",
		"https://i.imgur.com/BzoUYqd.png",
		"https://i.imgur.com/bs9omAJ.png",
		"https://i.imgur.com/aVK6mmq.png",
		"https://i.imgur.com/6KEqPLU.png",
		"https://i.imgur.com/9uf15xl.png",
		"https://i.imgur.com/gi0ko6Z.png",
		"https://i.imgur.com/Dn3eWW3.png",
		"https://i.imgur.com/fNdLWSP.png",
		"https://i.imgur.com/tcJggBJ.png",
		"https://i.imgur.com/jsBbghb.png",
		"https://i.imgur.com/ExmvZIw.png",
		"https://i.imgur.com/JCV48AS.png",
		"https://i.imgur.com/eNjFY8T.png",
		"https://i.imgur.com/6v4th6l.png",
		"https://i.imgur.com/9WemEsd.png",
		"https://i.imgur.com/xckeBfE.png",
		"https://i.imgur.com/XCudbfO.png",
		"https://i.imgur.com/8chj0BU.png",
		"https://i.imgur.com/eNjFY8T.png",
		"https://i.imgur.com/vZbH8lp.png",
		"https://i.imgur.com/BwGhoEv.png",
		"https://i.imgur.com/fsgyEkm.png"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.channel.send(response);
  }

}

module.exports = DiscordCommandRoused;
