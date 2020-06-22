const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandLore extends DiscordCommand {

    constructor(subsystem) {
        super("lore", "Gain the Lore role", undefined, subsystem);
    }

    onRun(message, permissions, args) {
        var config = this.subsystem.manager.getSubsystem("Config").config;
        if (permissions.includes('unlore')) {
            var response = "You already have the lore role."
        }
        else {
            message.member.addRole(config.discord_lore_role);
            var response = "You now have the Lore role."
        }

        message.channel.send(response);
    }

}

module.exports = DiscordCommandLore;