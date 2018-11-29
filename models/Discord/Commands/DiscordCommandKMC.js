const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandKMC extends DiscordCommand {

    constructor(subsystem) {
        super("kmc", "Pictures of event organizers", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
            "https://cdn.discordapp.com/attachments/300800158260658177/313801305271566337/images26.jpg",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801304520523776/images5.png",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801304449351680/images6.png",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801383059128322/yeezy-boost-350-v2-hbx-restock-1.jpg",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801382568132611/adidas-Yeezy-Boost-350-v2-.jpg"
        ];

        var response = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(response);
    }

}

module.exports = DiscordCommandKMC;