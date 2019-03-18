const DiscordRouter = require('../DiscordRouter.js');

class DiscordRouterMessageDelete extends DiscordRouter {

  constructor(subsystem) {
    super(subsystem);
  }

  register() {
    this.subsystem.client.on("messageUpdate", (oldMessage, newMessage) => {

      if (newMessage.guild == undefined) {
        return;
      }

      if (this.subsystem.isChannelRestricted(newMessage.channel.id)) {
        return;
      }


      var logChannel = this.subsystem.getLogChannel(newMessage.guild);
      var date = new Date();
      var response = "`[" + date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]` ";

      if (oldMessage.content !== newMessage.content) {
        response += "__**" + oldMessage.channel.name + "**__ | **" + newMessage.author.username + "#" + newMessage.author.discriminator + "** message was edited:\n";
        response += "     Old: `" + oldMessage.content + "`\n";
        response += "     New: `" + newMessage.content + "`";

        logChannel.send(response);
      }

    });
  }

}

module.exports = DiscordRouterMessageDelete;
