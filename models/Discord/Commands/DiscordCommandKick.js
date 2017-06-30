const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandKick extends DiscordCommand {

  constructor(subsystem) {
    super("kick", "Kick a user.", 'kick', subsystem);
  }

    onRun(message, permissions, args) {
        var config = this.subsystem.manager.getSubsystem("Config").config;
        if(args.length < 1) {
            message.reply("Usage is `" + config.discord_command_character + "kick [@UserName] <reason>`");
        }

        var user = undefined;

        for (var auser of message.mentions.users.array()) {
            user = auser;
            break;
        }

        if(user == undefined) {
            message.reply("I could not find that user, Make sure you use the mention format of @Username");
            return;
        }


        var guildMember = message.guild.fetchMember(user);
        guildMember.then(
          (resolve) => {
              var kickeeperms = this.subsystem.permissionManager.getUserPermissions(resolve);
              if (resolve.id == message.member.id) {
                  message.reply("You cannot kick yourself");
                  return;
              }
              if (kickeeperms.includes("kick")) {
                  message.reply("You cannot kick staff");
                  return;
              }

              resolve.kick(0).then(
                (resolve) => {
                    message.reply(resolve.user.username + " Was kicked from the server for `" + reason + "`.");
                },
                (reject) => {
                    message.reply("An error occured.");
                }
              );
          },
          (reject) => {
              message.reply("I could not find that user, Make sure that member is part of this guild.");
          }
        );
    }

}

module.exports = DiscordCommandKick;
