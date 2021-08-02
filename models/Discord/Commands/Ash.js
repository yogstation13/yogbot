const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandAsh extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "ash";
    this.description = "Pictures of our friendly neighbourhood onion"; // This dosen't seem right
    this.permission = undefined;
    this.subsystem = subsystem;
    this.hidden = true;
  }

  onRun(message, permissions, args) {
    var responses = [
      "http://www.nobelprize.org/nobel_prizes/chemistry/laureates/1911/marie-curie.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Einstein-formal_portrait-35.jpg/220px-Einstein-formal_portrait-35.jpg",
      "https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg",
      "http://i1.kym-cdn.com/entries/icons/original/000/020/303/Stephen-Hawking-387288.jpg"
    ];
    var response = responses[Math.floor(Math.random() * responses.length)];
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
	
    const embed = new Discord.RichEmbed()
      .setColor('#'+randomColor) // Random Color
      .setTitle('Ash Image') // Set to title whenever it is added
      .setImage(response)
      //.setFooter(author) // Uncomment when we have authors

    message.channel.send(embed);
  }

}

module.exports = DiscordCommandAsh;
