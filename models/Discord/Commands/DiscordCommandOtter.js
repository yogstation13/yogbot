const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandOtter extends DiscordCommand {

  constructor(subsystem) {
    super("otter", "Pictures of the cutest animals in your rivers", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
      "https://s-media-cache-ak0.pinimg.com/236x/09/f9/42/09f942ff96280d6ea96e45f9464982e9.jpg",
      "https://s-media-cache-ak0.pinimg.com/originals/2f/32/24/2f3224414aded7c46cad603c4bb69721.jpg",
      "http://cdn.pcwallart.com/images/cute-river-otters-wallpaper-4.jpg",
      "https://s-media-cache-ak0.pinimg.com/originals/1a/57/26/1a572617645b19ba1b86f82c32176955.jpg",
      "https://gifts.worldwildlife.org/gift-center/Images/large-species-photo/large-River-Otter-photo.jpg",
      "http://cuteotters.com/uploads/Cute_Otters_304.jpg",
      "http://data.whicdn.com/images/19034203/large.jpg",
      "https://8583b52b4a309671f69d-b436b898353c7dc300b5887446a26466.ssl.cf1.rackcdn.com/11013799_cute-otter-enjoying-his-lettuce-will-make_f8eaffe1_m.png?bg=988A82",
      "https://cdn.pixabay.com/photo/2015/08/29/19/39/otter-913421_960_720.jpg",
      "https://pbs.twimg.com/media/Ahc6LMJCIAMhk7s.jpg"
    ];
    var response = responses[Math.floor(Math.random() * responses.length)];
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    const embed = new Discord.RichEmbed()
      .setColor('#'+randomColor) // Random Color
      .setTitle('Random Otter') // Set to title whenever it is added
      .setImage(response)
      //.setFooter(author) // Uncomment when we have authors

    message.channel.send(embed);
  }

}

module.exports = DiscordCommandOtter;
