const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandUnBan extends DiscordCommand {

  constructor(subsystem) {
    super("unban", "Un-Ban a user.", 'ban', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if (args.length < 1) {
      message.reply("Usage is `" + config.discord_command_character + "unban [@UserName] <reason> (Currently only works for softbans)`");
      return;
    }

    var user = undefined;

    for (var auser of message.mentions.users.array()) {
      user = auser;
      break;
    }

    if (user == undefined) {
      message.reply("I could not find that user, Make sure you use the mention format of @Username");
      return;
    }

    var guildMember = message.guild.members.fetch(user);
    guildMember.then(
      resolve => {
        args.shift();
        if (resolve.id == message.member.id) {
          message.reply("You cannot unban yourself"); //get fucked KMC
          return;
        }

        var reason = "No reason given.";

        if (args.length > 0) {
          reason = args.join(" ");
        }

        var banStatus = this.subsystem.banManager.unban(resolve.guild, resolve, reason);

        if (banStatus) {
          this.subsystem.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") unbanned " + resolve.author.username + "#" + resolve.author.discriminator + " (" + resolve.author.id + ") for \"" + reason + "\".");
          message.reply("User was unbanned.");
        }
        else {
          message.reply("An error occured, double check username.");
        }
      },
      reject => {
        message.reply("I could not find that user, Make sure that member is part of this guild.");
      }
    );
  }

}

module.exports = DiscordCommandUnBan;
