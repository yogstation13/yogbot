const DiscordRouter = require('../DiscordRouter.js');

class DiscordRouterGuildMemberRemove extends DiscordRouter {

  constructor(subsystem) {
    super(subsystem);
  }

  register() {
    this.subsystem.client.on("guildMemberRemove", (member) =>{
      var feedbackChannel = this.subsystem.getFeedbackChannel(member.guild);
      var date = new Date();
      var response = "`[" + date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]` ";

      feedbackChannel.sendMessage(response + "**" + member.user.username + "#" + member.user.discriminator + "** left the server.");
    });
  }

}

module.exports = DiscordRouterGuildMemberRemove;
