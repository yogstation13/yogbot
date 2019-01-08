const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandKtlfm extends DiscordCommand {

    constructor(subsystem) {
        super("ktlfm", "(un)subscribe to KTL.FM announcements", undefined, subsystem);
    }

    onRun(message, permissions, args) {
        var config = this.subsystem.manager.getSubsystem("Config").config;
        if (permissions.includes('ktlfm')) {
            message.member.removeRole(config.discord_ktlfm_role);
            var response = "You are now unsubscribed from KTL.FM"
        }
        else {
            message.member.addRole(config.discord_ktlfm_role);
            var response = "You are now subscribed to KTL.FM"
        }

        message.channel.send(response);
    }

}

module.exports = DiscordCommandKtlfm;
