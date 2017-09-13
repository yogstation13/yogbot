const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandApples extends DiscordCommand {

  constructor(subsystem) {
    super("apples", "Council speedrunner", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = ["http://i.imgur.com/AnUmGx3.jpg", "http://i.imgur.com/AGMzoP7.png", "http://i.imgur.com/aUkVKnf.png", "http://i.imgur.com/uotAwAy.png", "http://i.imgur.com/NKeMihP.png", "http://i.imgur.com/ruSaMoS.png", "http://i.imgur.com/wP89Euc.png", "http://i.imgur.com/By4rdWL.jpg", "http://i.imgur.com/XljVPoq.jpg", "http://i.imgur.com/UYExMSS.jpg", "http://i.imgur.com/7sklrgF.jpg"];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandApples;
