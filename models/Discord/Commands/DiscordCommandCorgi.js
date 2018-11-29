const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandCorgi extends DiscordCommand {

    constructor(subsystem) {
        super("corgi", "Pictures of Ian's children", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
          "https://img.buzzfeed.com/buzzfeed-static/static/2014-01/enhanced/webdr07/9/16/enhanced-buzz-23311-1389303550-35.jpg?no-auto",
          "https://img.buzzfeed.com/buzzfeed-static/static/2014-01/enhanced/webdr06/9/16/enhanced-buzz-31339-1389303596-18.jpg?no-auto",
          "https://img.buzzfeed.com/buzzfeed-static/static/2014-01/enhanced/webdr03/9/16/enhanced-buzz-22390-1389303880-0.jpg?no-auto",
          "https://img.buzzfeed.com/buzzfeed-static/static/2014-01/enhanced/webdr02/9/17/enhanced-buzz-9156-1389305978-4.jpg?no-auto",
          "https://img.buzzfeed.com/buzzfeed-static/static/2014-01/enhanced/webdr06/10/10/enhanced-buzz-17823-1389369072-2.jpg?no-auto",
          "https://img.buzzfeed.com/buzzfeed-static/static/2014-01/enhanced/webdr05/10/11/enhanced-buzz-16774-1389370807-2.jpg?no-auto"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(response);
    }

}

module.exports = DiscordCommandCorgi;
