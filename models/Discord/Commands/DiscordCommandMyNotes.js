const DiscordCommand = require('../DiscordCommand.js');


class DiscordCommandMyNotes extends DiscordCommand {

  constructor(subsystem) {
    super("mynotes", "Checks your notes", null, subsystem);
  }

  onRun(message, permissions, args) {

    var dbSubsystem = this.subsystem.manager.getSubsystem("Database");

    dbSubsystem.pool.getConnection((err, connection) => {
      if (err) {
        connection.release();
        message.reply("Error contacting database, try again later.");
        return;
      }
      var userID = message.author.id
      if(!userID) {
        message.reply("Unknown Error while getting Discord ID!")
        return;
      }

      connection.query('SELECT * FROM `' + dbSubsystem.format_table_name('player') + '` WHERE `discord_id` = ?', [userID], (error, results, fields) => {
        if (error) {
          message.reply("Error running select query, try again later.");
          return;
        }
        if (results.length == 0) {
          message.reply("No linked BYOND account found. Are you sure you have linked your Discord to your BYOND?");
          return;
        }
        if (results.length > 1) {
          message.reply("More than one BYOND account linked to this ID. This shouldn't happen!");
          return;
        }

        var ckey = results[0].ckey

        connection.query('SELECT * FROM `' + dbSubsystem.format_table_name('messages') + '` WHERE `targetckey` = ? AND `type`= "note" AND deleted = 0 AND (expire_timestamp > NOW() OR expire_timestamp IS NULL) AND `secret` = 0 ORDER BY `timestamp`', [ckey], (error, results, fields) => {
          var guildMember = message.member;
          if (error) {
            message.reply("Error getting notes, try again later.");
          }
          message.reply("Success. Check your Direct Messages.");
          if (results.length == 0) {
            guildMember.sendMessage("You have no notes.");
          }
          else {
            var msg = "Notes for " + ckey + "\n";
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
              newmsg += "```";
              if(msg.length + newmsg.length > 2000) {
                guildMember.user.sendMessage(msg);
                msg = newmsg;
              }
              else {
                msg += newmsg;
              }
            }
            guildMember.user.sendMessage(msg);
          }
        });
      })
      connection.release();
    });
  }

}

module.exports = DiscordCommandMyNotes;
