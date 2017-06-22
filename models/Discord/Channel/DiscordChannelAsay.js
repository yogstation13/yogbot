const DiscordChannel = require('../DiscordChannel.js');

class DiscordChannelAsay extends DiscordRouter {

  constructor(subsystem) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    super(subsystem, config.discord_channel_asay);
  }

  register() {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    byondConnector.request("?asay=" + message.content + "&author=" + message.author.username + "&key=" + config.server_key, (results) => {
      if('error' in results) {
        message.reply(results.error);
      }
    });
  }

}

module.exports = DiscordChannelAsay;
