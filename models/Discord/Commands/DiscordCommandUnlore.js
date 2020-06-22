const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandUnlore extends DiscordCommand {

    constructor(subsystem) {
        super("unlore", "Remove the Lore role", 'unlore', subsystem);
    }

    onRun(message, permissions, args) {
        var config = this.subsystem.manager.getSubsystem("Config").config;
        message.member.removeRole(config.discord_lore_role);
        message.reply("You have removed the Lore role.");
    }

}

module.exports = DiscordCommandUnlore;