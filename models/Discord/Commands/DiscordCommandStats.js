const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandStats extends DiscordCommand {

    constructor(subsystem) {
        super("stats", "Shows a link", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        message.reply("http://158.69.120.60:8888/stats");
    }

}

module.exports = DiscordCommandStats;
