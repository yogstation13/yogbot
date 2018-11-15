const DiscordChannel = require('../DiscordChannel.js');
const striptags = require('striptags');

class DiscordChannelOOC extends DiscordChannel {

    constructor(subsystem) {
        var config = subsystem.manager.getSubsystem("Config").config;
        super(subsystem, config.discord_ooc_channel);
    }

    onMessage(message) {
        var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;
        var config = this.subsystem.manager.getSubsystem("Config").config;
        byondConnector.request("?ooc=" + encodeURIComponent(striptags(message.content)) + "&admin=" + encodeURIComponent(message.author.username), (results) => {
            if ('error' in results) {
                message.reply(results.error);
            }
        });
    }

}

module.exports = DiscordChannelOOC;
