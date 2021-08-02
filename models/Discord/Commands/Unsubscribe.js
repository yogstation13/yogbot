const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandUnsubscribe extends DiscordCommand {

    constructor(subsystem) {
        super();
        this.name = "unsubscribe";
        this.description = "unsubscribe from the roundstart announcements";
        this.permission = "unsubscribe";
        this.subsystem = subsystem;
    }

    onRun(message, permissions, args) {
        var config = this.subsystem.manager.getSubsystem("Config").config;
        message.member.removeRole(config.discord_subscriber_role);
        message.reply("You have been unsubscribed");
    }

}

module.exports = DiscordCommandUnsubscribe;