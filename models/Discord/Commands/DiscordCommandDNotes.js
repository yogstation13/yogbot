const DiscordCommand = require('../DiscordCommand.js');


class DiscordCommandDNotes extends DiscordCommand {

  constructor(subsystem) {
    super("dnotes", "Checks a Discord users notes if they have their account linked", 'note', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if(args.length < 1) {
      message.reply("Usage is `" + config.discord_command_character + "dnotes [@UserName`");
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
          message.reply("No linked BYOND account found.");
          return;
        }
        if (results.length > 1) {
          message.reply("More than one BYOND account linked to this ID. This shouldn't happen!");
          return;
        }

        var ckey = results[0].ckey

        connection.query('SELECT * FROM `erro_messages` WHERE `targetckey` = ? AND `type`= "note" AND deleted = 0 AND (expire_timestamp > NOW() OR expire_timestamp IS NULL) ORDER BY `timestamp`', [ckey], (error, results, fields) => {
          if (error) {
            message.reply("Error running select query, try again later.");
          }

          if (results.length == 0) {
            message.reply("Player has no notes.");
          }
          else {
            var msg = "Notes for " + userID + "\n";
            var shownNotes = [];
            for(var i = 0; i < results.length; i++){
              var result = results[i]
              var newmsg = "```" + result.timestamp + "\t" + result.text
              if(shownNotes.length) {
                for(var j = 0; j < shownNotes.length; j++) {
                  if(newmsg == shownNotes[j]) {
                    newmsg = null;
                    break;
                  }
                }
              }
              if(newmsg == null) {
                continue;
              }
              shownNotes.push(newmsg);
              if(message.channel.id == config.discord_channel_admin || message.channel.id == config.discord_channel_council) {
                newmsg += "   " + result.adminckey;
              }
              newmsg += "```";
              if(msg.length + newmsg.length > 2000) {
                message.channel.send(msg);
                msg = newmsg;
              }
              else {
                msg += newmsg;
              }
            }
            message.channel.send(msg);
          }
          connection.release();
        });
      })



    });
  }

}

module.exports = DiscordCommandDNotes;
