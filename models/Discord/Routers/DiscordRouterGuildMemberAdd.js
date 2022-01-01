const DiscordRouter = require('../DiscordRouter.js');

class DiscordRouterGuildMemberAdd extends DiscordRouter {

  constructor(subsystem) {
    super(subsystem);
  }

  register() {
    this.subsystem.client.on("guildMemberAdd", (member) =>{
      if(this.subsystem.isPrimaryGuild(member.guild)) return

      var feedbackChannel = this.subsystem.getFeedbackChannel(member.guild);
      var date = new Date();
      var response = "`[" + date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]` ";
      
      this.subsystem.banManager.check(member);
      feedbackChannel.send(response + "**" + member.user.username + "#" + member.user.discriminator + "** joined the server.");
    });
  }

}

module.exports = DiscordRouterGuildMemberAdd;
