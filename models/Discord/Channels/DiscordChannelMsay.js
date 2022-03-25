const DiscordChannel = require('../DiscordChannel.js');
const striptags = require('striptags');

class DiscordChannelMsay extends DiscordChannel {

  constructor(subsystem) {
    var config = subsystem.manager.getSubsystem("Config").config;
    super(subsystem, config.discord_msay_channel);
  }

  onMessage(message) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var data = striptags(message.content)
	
    message.attachments.forEach((image) => {
		if(image && (image.filename.endsWith(".jpg") || image.filename.endsWith(".png"))){
			data = data+"<br><img src=\""+image.url+"\" alt=\"Image\">";
		}
	});

    const request = "?msay=" + encodeURIComponent(data) + "&admin=" + encodeURIComponent(message.member.displayName)
    this.subsystem.manager.getSubsystem("Byond Connector").request(request).catch(message.channel.send)
  }

}

module.exports = DiscordChannelMsay;
