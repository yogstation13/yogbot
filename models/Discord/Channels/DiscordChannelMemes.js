const DiscordChannel = require('../DiscordChannel.js');

class DiscordChannelMemes extends DiscordChannel {
    
    constructor(subsystem) {
        var config = subsystem.manager.getSubsystem("Config").config;
        super(subsystem, config.discord_channel_memes);
    };

    onMessage(msg) {
         if (msg.attachments.size > 0 || msg.embeds.length > 0) {
            msg.react('👍');
            msg.react('👎');
            };
    };
};

module.exports = DiscordChannelMemes;
