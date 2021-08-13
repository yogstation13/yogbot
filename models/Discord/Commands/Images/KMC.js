const DiscordImageCommand = require('../../DiscordImageCommand.js');

class DiscordCommandKMC extends DiscordImageCommand {

    constructor(subsystem) {
        super();
        this.name = "kmc";
        this.description = "Pictures of event organizers";
        this.subsystem = subsystem;
        this.title = "KMC Image";
        this.images = [
            "https://cdn.discordapp.com/attachments/300800158260658177/313801305271566337/images26.jpg",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801304520523776/images5.png",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801304449351680/images6.png",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801383059128322/yeezy-boost-350-v2-hbx-restock-1.jpg",
            "https://cdn.discordapp.com/attachments/300800158260658177/313801382568132611/adidas-Yeezy-Boost-350-v2-.jpg"
        ];
    }
}

module.exports = DiscordCommandKMC;