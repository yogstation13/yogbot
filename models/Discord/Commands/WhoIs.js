const DiscordCommand = require('../DiscordCommand.js');


class DiscordCommandWhoIs extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "whois";
    this.description = "Checks a Discord users ckey if they have their accounts linked.";
    this.permission = undefined;
    this.subsystem = subsystem
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if(args.length < 1) {
      message.reply("Usage is `" + config.discord_command_character + "whois [@UserName`");
      return;
    }
    var user = undefined;

    for (var auser of message.mentions.users.array()) {
      user = auser;
      break;
    }

    var dbSubsystem = this.subsystem.manager.getSubsystem("Database");

    dbSubsystem.pool.getConnection((err, connection) => {
      if (err) {
        connection.release();
        message.reply("Error contacting database, try again later.");
        return;
      }
      var userID = auser
      if(!userID) {
        message.reply("Unknown Error while getting Discord ID!")
        return;
      }

      connection.query("SELECT * FROM `erro_player` WHERE `discord_id` = ?", [userID.id], (error, results, fields) => {
        if (error) {
          message.reply("Error running select query, try again later.");
          return;
        }
        if (results.length == 0) {
          message.reply("No linked BYOND account found for this user.");
          return;
        }
        if (results.length > 1) {
          message.reply("More than one BYOND account linked to this ID. This shouldn't happen!");
          return;
        }

        var ckey = results[0].ckey
        message.reply(userID + " belongs to the ckey '" + ckey +"'")
      })
      connection.release();
    });
  }

}

module.exports = DiscordCommandWhoIs;
