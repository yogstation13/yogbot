const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandTempban extends DiscordCommand {

  constructor(subsystem) {
    super("tempban", "Tempban a user.", 'tempban', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if(args.length < 1) {
      message.reply("Usage is `" + config.discord_command_character + "tempban [@UserName] [Seconds] <reason>`");
      return;
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

    var seconds = args[1];

    if(isNaN(seconds)) {
      message.reply(seconds + " is not a valid integer.");
      return;
    }

    args.shift();

    var feedbackChannel = this.subsystem.getFeedbackChannel(message.guild);
    var guildMember = message.guild.fetchMember(user);
    guildMember.then(
      resolve => {
        args.shift();

        var reason = "No reason given.";

        if(args.length > 0) {
          reason = args.join(" ");
        }
        var banStatus = this.subsystem.banManager.ban(resolve, reason, seconds);

        if(banStatus) {
          message.reply("User was banned.");
        } else {
          message.reply("An error occured, perhaps the bot cant ban that user.")
        }
      },
      (reject) => {
        message.reply("I could not find that user, Make sure that member is part of this guild.");
      }
    );
  }

}

module.exports = DiscordCommandTempban;
