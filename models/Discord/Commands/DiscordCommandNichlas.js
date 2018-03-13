const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandNichlas extends DiscordCommand {

  constructor(subsystem) {
    super("nichlas", "et-ellerandet et-eller-andet kartoffel", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var svarene = [
      "http://i.imgur.com/RA0v3cW.jpg",
      "http://i.imgur.com/ugbj0m1.png",
      "http://i.imgur.com/pmgSHjz.png"
    ];
    var svar = svarene[Math.floor(Math.random() * svarene.length)];
    message.reply(svar);
  }

}

module.exports = DiscordCommandNichlas;
