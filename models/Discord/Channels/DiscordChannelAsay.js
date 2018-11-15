const DiscordChannel = require('../DiscordChannel.js');

class DiscordChannelAsay extends DiscordChannel {

  constructor(subsystem) {
    var config = subsystem.manager.getSubsystem("Config").config;
    super(subsystem, config.discord_asay_channel);
  }

  onMessage(message) {
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var data = message.content
    if(message.attachments.length)
      var image = message.attachments[0]
      if(image.filename.endsWith(".jpg") || image.filename.endsWith(".png"))
        data = "<img src=\""+image.url+"\" alt=\""+encodeURIComponent(message.content)+"\">"
    byondConnector.request("?asay=" + encodeURIComponent(data) + "&admin=" + encodeURIComponent(message.author.username), (results) => {
      if ('error' in results) {
        message.reply(results.error);
      }
    });
  }

}

module.exports = DiscordChannelAsay;
