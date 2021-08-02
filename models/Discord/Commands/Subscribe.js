const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandSubscribe extends DiscordCommand {

    constructor(subsystem) {
        super();
        this.name = "subscribe";
        this.description = "subscribe to the roundstart announcements";
        this.permission = undefined;
        this.subsystem = subsystem;
    }

    onRun(message, permissions, args) {
        var config = this.subsystem.manager.getSubsystem("Config").config;
        if (permissions.includes('unsubscribe')) {
            var response = "You are already subscribed."
        }
        else {
            message.member.addRole(config.discord_subscriber_role);
            var response = "You are now a subscriber."
        }

        message.channel.send(response);
    }

}

module.exports = DiscordCommandSubscribe;
