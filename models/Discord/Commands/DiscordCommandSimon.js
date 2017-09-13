const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandSimon extends DiscordCommand {

  constructor(subsystem) {
    super("simon", "Pictures of the Dæne", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = ["https://cdn.discordapp.com/attachments/134722036353204224/357596897050886144/download.jpg", "https://cdn.discordapp.com/attachments/134722036353204224/357598415711895552/bwjftcz5ingfji28la3h.jpg", "https://cdn.discordapp.com/attachments/134722036353204224/349623769779666946/download.jpg", "https://i.imgur.com/uDsHVLW.jpg", "https://i.imgur.com/1X91zDV.jpg", "https://i.imgur.com/TIzPllv.jpg", "https://i.imgur.com/MF5a1I8.png"];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandSimon;
