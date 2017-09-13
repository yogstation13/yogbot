const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandManatee extends DiscordCommand {

  constructor(subsystem) {
    super("manatee", "Pictures of very menacing manatees", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = ["https://cdn.discordapp.com/attachments/134722036353204224/357594548039581697/4961533005dc5510e49af2ea3789c80a--manatee-drawing-manatee-painting.jpg", "https://i.imgur.com/bCguwdn.jpg", "https://i.imgur.com/Z6IF4gR.jpg", "https://i.imgur.com/5VIfWhF.png", "https://i.imgur.com/gXYhvki.jpg", "https://i.imgur.com/cSXO2i4.jpg", "https://cdn.discordapp.com/attachments/134722036353204224/357626080414400512/unknown.png", "https://i.imgur.com/Wmrqu0U.jpg", "https://i.imgur.com/9d8xCRQ.jpg", "https://i.imgur.com/OlBm7g2.png", "https://i.imgur.com/xwEhrno.jpg", "http://i.imgur.com/jexXwfD.jpg?1"];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandManatee;
