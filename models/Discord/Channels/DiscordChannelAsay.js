const DiscordChannel = require('../DiscordChannel.js');
const striptags = require('striptags');

class DiscordChannelAsay extends DiscordChannel {

  constructor(subsystem) {
    var config = subsystem.manager.getSubsystem("Config").config;
    super(subsystem, config.discord_asay_channel);
  }

  onMessage(message) {
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var data = striptags(message.content)
    if(message.attachments && message.attachments.length)
      var image = message.attachments[0]
      if(image && (image.filename.endsWith(".jpg") || image.filename.endsWith(".png")))
        data = data+"<br><img src=\""+image.url+"\" alt=\"Image\">"
    byondConnector.request("?asay=" + encodeURIComponent(data) + "&admin=" + encodeURIComponent(message.author.username), (results) => {
      if ('error' in results) {
        message.channel.send(results.error);
      }
    });
  }

}

module.exports = DiscordChannelAsay;
