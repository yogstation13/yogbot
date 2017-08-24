const DiscordRouter = require('../DiscordRouter.js');

class DiscordRouterMessageDelete extends DiscordRouter {

  constructor(subsystem) {
    super(subsystem);
  }

  register() {
    this.subsystem.client.on("messageDelete", (message) => {

      if (message.guild == undefined) {
        return;
      }

      if (this.subsystem.isChannelRestricted(message.channel.id)) {
        return;
      }

      var logChannel = this.subsystem.getLogChannel(message.guild);
      var date = new Date();
      var response = "`[" + date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]` ";

      logChannel.send(response + "**" + message.author.username + "#" + message.author.discriminator + "** message was deleted ```" + message.content + "```");
    });
  }

}

module.exports = DiscordRouterMessageDelete;
