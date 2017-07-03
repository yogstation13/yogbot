const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandLizard extends DiscordCommand {

    constructor(subsystem) {
        super("lizard", "Pictures of Lizards", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
          "http://claycord.com/wp-content/uploads/2015/03/nature.jpg",
          "http://i1.treknature.com/photos/1457/kuscar.jpg",
          "https://c1.staticflickr.com/8/7460/9393543410_dfef909a67_b.jpg",
          "http://www.richard-seaman.com/Wallpaper/Nature/Reptiles/Lizards/AngryPhanomBenchaLizard.jpg",
          "https://s-media-cache-ak0.pinimg.com/originals/17/62/95/176295a832814825bdcd2528a459ed85.jpg",
          "http://www.richard-seaman.com/Wallpaper/Nature/Reptiles/Lizards/AngryFlyingGecko.jpg",
          "http://i395.photobucket.com/albums/pp37/Shocka311/0419081320b.jpg"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        message.reply(response);
    }

}

module.exports = DiscordCommandLizard;
