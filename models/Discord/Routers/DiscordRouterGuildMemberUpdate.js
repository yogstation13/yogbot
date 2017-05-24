const DiscordRouter = require('../DiscordRouter.js');

class DiscordRouterGuildMemberUpdate extends DiscordRouter {

  constructor(subsystem) {
    super(subsystem);
  }

  register() {
    this.subsystem.client.on("guildMemberUpdate", (oldMember, newMember) =>{
      var logChannel = this.subsystem.getLogChannel(newMember.guild);
      var date = new Date();
      var response = "`[" + date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]` ";

      //Check for nickname changes
      if(oldMember.nickname !== newMember.nickname) {
        logChannel.sendMessage(response + "**" + newMember.user.username + "#" + newMember.user.discriminator +  "** changed their nickname to `" + newMember.nickname + "`")
      }

      //Check for role changes
      if(oldMember.roles.array().length != newMember.roles.array().length) {
        response += "**" + newMember.user.username + "#" + newMember.user.discriminator +  "** roles have changed:\n     Old Roles: ";

        var roles = oldMember.roles.array();

        if(roles.length > 1) {

          for (var i = 0; i < roles.length; i++) {
            var roleName = roles[i].name;
            if(roleName === "@everyone") {
              continue;
            }
            response += "**" + roleName + "**";
            if(i != roles.length-1) {
              response += ",";
            }
          }

        } else {
          response += "_none_";
        }

        response += "\n     New roles: ";

        var roles = newMember.roles.array();

        if(roles.length > 1) {

          for (var i = 0; i < roles.length; i++) {
            var roleName = roles[i].name;
            if(roleName === "@everyone") {
              continue;
            }
            response += "**" + roleName + "**";
            if(i != roles.length-1) {
              response += ",";
            }
          }

        } else {
          response += "_none_";
        }

        logChannel.sendMessage(response);
      }
    });
  }

}

module.exports = DiscordRouterGuildMemberUpdate;
