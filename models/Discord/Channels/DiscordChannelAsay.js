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
    var data = striptags(message.content);
    var guildMember = message.guild.fetchMember(message.member);
    message.reply(guildMember);
    message.reply(guildMember.user.username);
    message.reply(guildMember.user.userID);
    message.reply(guildMember.user.discriminator);
    message.reply(guildMember.username);
    message.reply(guildMember.user.user);


    message.attachments.forEach((image) => {
		if(image && (image.filename.endsWith(".jpg") || image.filename.endsWith(".png"))){
			data = data+"<br><img src=\""+image.url+"\" alt=\"Image\">";
		}
	});
	
    byondConnector.request("?asay=" + encodeURIComponent(data) + "&admin=" + encodeURIComponent(message.author.username + "/" + guildMember.nickname), (results) => {
      if ('error' in results) {
        message.channel.send(results.error);
      }
    });
  }

}

module.exports = DiscordChannelAsay;
