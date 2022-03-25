const DiscordChannel = require('../DiscordChannel.js');
const striptags = require('striptags');

class DiscordChannelOOC extends DiscordChannel {

    constructor(subsystem) {
        var config = subsystem.manager.getSubsystem("Config").config;
        super(subsystem, config.discord_ooc_channel);
    }

    onMessage(message) {
        var config = this.subsystem.manager.getSubsystem("Config").config;
        const request = "?ooc=" + encodeURIComponent(striptags(message.content)) + "&admin=" + encodeURIComponent(message.member.displayName)
        this.subsystem.manager.getSubsystem("Byond Connector").request(request)
          .catch(message.channel.send)
    }

}

module.exports = DiscordChannelOOC;
