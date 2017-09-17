const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandCodey extends DiscordCommand {

    constructor(subsystem) {
        super("codey", "Pictures of code", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/549px-Java_programming_language_logo.svg.png",
          "https://ignite.apache.org/images/cpp.png",
          "https://i.imgur.com/DKBhkII.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Webysther_20160423_-_Elephpant.svg/2000px-Webysther_20160423_-_Elephpant.svg.png",
          "http://www.javatpoint.com/images/javascript/javascript_logo.png",
          "http://www.gandgtech.com/images/visualbasic.png"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        message.reply(response);
    }

}

module.exports = DiscordCommandCodey;
