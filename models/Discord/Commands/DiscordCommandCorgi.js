const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandCorgi extends DiscordCommand {

    constructor(subsystem) {
        super("corgi", "Pictures of Ian's children", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
          "https://cdn.discordapp.com/attachments/205784753352343552/767106936508121098/k9i7YLN.jpg",
          "https://cdn.discordapp.com/attachments/205784753352343552/767106936775770163/r1isn2kqbiq01.jpg",
          "https://cdn.discordapp.com/attachments/205784753352343552/767106936965169182/y99yj67o3utz.jpg",
          "https://cdn.discordapp.com/attachments/205784753352343552/767106937166233600/kjc24vncs4811.jpg",
          "https://cdn.discordapp.com/attachments/205784753352343552/767106937358647336/cdgz8cwgovez.jpg",
		  "https://cdn.discordapp.com/attachments/205784753352343552/767106937803374622/830Bmqj.jpg",
		  "https://cdn.discordapp.com/attachments/205784753352343552/767106937988186122/e05qeJD.jpg",
          "https://cdn.discordapp.com/attachments/205784753352343552/767106937569280040/b6l73MX.jpg"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(response);
    }

}

module.exports = DiscordCommandCorgi;
