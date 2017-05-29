const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandNichlas extends DiscordCommand {

  constructor(subsystem) {
    super("nichlas", "Something something potato", undefined, subsystem, hidden, true);
  }

  onRun(message, permissions, args) {
    var responses = [
      "http://i.imgur.com/RA0v3cW.jpg",
      "https://lh3.googleusercontent.com/-qRmDvvvSw70/V1JQ54e1lyI/AAAAAAAAAXs/INTs7fIUgug9O8UmuKeeUy9xJgE4TnkGw/w426-h409/Potato.png"
    ];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandNichlas;
