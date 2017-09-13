const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandOak extends DiscordCommand {

  constructor(subsystem) {
    super("oak", "Pigtures of consil blease :DDD", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = ["https://cdn.discordapp.com/attachments/134722036353204224/357308710315622400/75effd022f2f3beed48fa58027741ac1c76b112ed184bd1c37be93bc9786dd5a.jpg", "https://cdn.discordapp.com/attachments/134722036353204224/357308256932200468/1502487435509.png", "https://cdn.discordapp.com/attachments/134722036353204224/357215330742960138/1478923206629.png", "https://cdn.discordapp.com/attachments/134722036353204224/355046168851382275/1490619210410.png", "https://memestatic.fjcdn.com/pictures/Gondola_1ea063_6170689.jpg", "https://memes4.fjcdn.com/pictures/Gondola_b416c4_6170689.jpg", "https://memes4.fjcdn.com/pictures/Gondola_c27111_6170689.jpg", "https://memestatic.fjcdn.com/pictures/Gondola+art_a1ac9a_6170689.jpg", "https://memes4.fjcdn.com/pictures/Gondola_730f7e_6170689.jpg", "http://i.imgur.com/SVwB908.png", "https://cdn.discordapp.com/attachments/134722036353204224/355046544652894208/1481840106044.png"];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandOak;
