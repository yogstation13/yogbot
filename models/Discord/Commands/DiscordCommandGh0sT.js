const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandGh0sT extends DiscordCommand {

   constructor(subsystem) {
    gh0st("gh0st", "Spooky Boi", undefined, subsystem, true);
   }
   
   onRun(message, permissions, args) {
   var responses = [
                "https://imgur.com/gallery/kLqiezk",
                "https://imgur.com/gallery/rBt3Vgg",
                "https://imgur.com/gallery/0ivOCgD",
                "https://imgur.com/gallery/PoQba8K",
                "https://imgur.com/gallery/cgJhQjz"
      ];
  var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandGh0sT;
