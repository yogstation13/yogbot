const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandNotes extends DiscordCommand {

  constructor(subsystem) {
    super("notes", "Check a user's notes", 'note', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if (args.length < 1) {
      message.reply("Usage is `" + config.discord_command_character + "notes [ckey]`");
      return;
    }

    var ckey = args[0];

    var dbSubsystem = this.subsystem.manager.getSubsystem("Database");

    dbSubsystem.pool.getConnection((err, connection) => {
      if (err) {
        message.reply("Error contacting database, try again later.");
      }
      connection.query('SELECT * FROM `erro_messages` WHERE `targetckey` = ? AND `type`= "note" ORDER BY `timestamp`', [ckey], (error, results, fields) => {
        if (error) {
          message.reply("Error running select query, try again later.");
        }

        if (results.length == 0) {
          message.reply("Player has no notes.");
        }
        else {
          var msg = "Notes for " + ckey + "\n";
          var oldmsg
          for(var i = 0; i < results.length; i++){
            var result = results[i]
            if(result == oldmsg) {
              continue;
            }
            oldmsg = result;
            if(msg.length + result.length > 2000) {
              message.channel.send(msg);
              msg = "```" + result.timestamp + "   " + result.text;
            }
            else
            {
              msg += "```" + result.timestamp + "   " + result.text;
            }
            if(message.channel.id == config.discord_channel_admin || message.channel.id == config.discord_channel_council) {
              msg += "   " + result.adminckey;
            }
            msg += "```";
          }
          message.channel.send(msg);
          }
      });
    });
  }

}

module.exports = DiscordCommandNotes;
