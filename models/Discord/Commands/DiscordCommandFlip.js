const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandFlip extends DiscordCommand {

    constructor(subsystem) {
        super("flip", "Flips a Coin", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
          "Heads! \n http://www.telegraph.co.uk/content/dam/news/2016/09/16/penny2-small_trans_NvBQzQNjv4BqW2ToWV4haXdJlF6GcI48qW-lM1cdpzBNZdI2wojOJ08.jpg",
          "Tails! \n http://www.checkyourchange.co.uk/wp-content/uploads/2015/03/penny2003rev.jpg"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        message.reply(response);
    }

}

module.exports = DiscordCommandFlip;