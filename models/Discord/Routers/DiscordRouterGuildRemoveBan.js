const DiscordRouter = require('../DiscordRouter.js');

class DiscordRouterGuildBanRemove extends DiscordRouter {

  constructor(subsystem) {
    super(subsystem);
  }

  register() {
    this.subsystem.client.on("guildBanRemove", (guild, user) =>{
      var feedbackChannel = this.subsystem.getFeedbackChannel(guild);
      var date = new Date();
      var response = "`[" + date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]` ";

      feedbackChannel.send(response + "**" + user.username + "#" + user.discriminator + "** was un-banned from the server.");
    });
  }

}

module.exports = DiscordRouterGuildBanRemove;
