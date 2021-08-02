const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandTempban extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "tempban";
    this.description = "Tempban a user.";
    this.permission = "tempban";
    this.subsystem = subsystem;
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if (args.length < 1) {
      message.reply("Usage is `" + config.discord_command_character + "tempban [@UserName] [Minutes] <reason>`");
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

    var minutes = args[1];

    if (isNaN(minutes)) {
      message.channel.send(minutes + " is not a valid integer.");
      return;
    }

    args.shift();

    var guildMember = message.guild.fetchMember(user);
    guildMember.then(
      resolve => {
        args.shift();

        var reason = "No reason given.";

        if (args.length > 0) {
          reason = args.join(" ");
        }
        var banStatus = this.subsystem.banManager.ban(resolve, reason, minutes);

        if (banStatus) {
          this.subsystem.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") banned " + resolve.author.username + "#" + resolve.author.discriminator + " (" + resolve.author.id + ") for " + minutes + " minutes for \"" + reason + "\".");
          message.reply("User was banned.");
        }
        else {
          message.reply("An error occured, perhaps the bot cant ban that user.");
        }
      },
      (reject) => {
        message.reply("I could not find that user, Make sure that member is part of this guild.");
      }
    );
  }

}

module.exports = DiscordCommandTempban;
