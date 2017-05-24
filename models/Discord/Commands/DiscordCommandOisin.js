const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandOisin extends DiscordCommand {

  constructor(subsystem) {
    super("oisin", "Pictures of our friendly neighbourhood onion", undefined, subsystem);
  }

  onRun(message, permissions, args) {
    var responses = [
      "http://www.nobelprize.org/nobel_prizes/chemistry/laureates/1911/marie-curie.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Einstein-formal_portrait-35.jpg/220px-Einstein-formal_portrait-35.jpg",
      "https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg",
      "http://i1.kym-cdn.com/entries/icons/original/000/020/303/Stephen-Hawking-387288.jpg"
    ];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandOisin;
