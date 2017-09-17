const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandArcticfox extends DiscordCommand {

    constructor(subsystem) {
        super("arcticfox", "Pictures of arctic foxes", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePL3FQb4jdPPsJRSfERiEt9ykHETfTH5mAuXDJ089eiBGAqRz",
          "http://elelur.com/data_images/mammals/arctic-fox/arctic-fox-02.jpg",
          "http://www.nationalgeographic.com/content/dam/animals/pictures/mammals/a/arctic-fox/arctic-fox.JPG",
          "http://fennecfoxes.webs.com/evde-baykus.jpg"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        message.reply(response);
    }

}

module.exports = DiscordCommandArcticfox;
