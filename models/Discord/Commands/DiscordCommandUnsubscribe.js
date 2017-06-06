const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandUnsubscribe extends DiscordCommand {

    constructor(subsystem) {
        super("unsubscribe", "unsubscribe from the roundstart announcements", 'unsubscribe', subsystem);
    }

    onRun(message, permissions, args) {
        var config = this.subsystem.manager.getSubsystem("Config").config;
        message.author.removeRole(config.discord_subscriber_role);
        message.reply("You have been unsubscribed");
    }

}

module.exports = DiscordCommandUnsubscribe;