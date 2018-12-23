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
          for(var i = 0; i < results.length; i++){
            var result = results[i]
            msg += "```" + result.timestamp + "   " + result.text;
            if(message.channel.id == config.discord_channel_admin || message.channel.id == config.discord_channel_admemes || message.channel.id == config.discord_channel_council) {
              msg += "   " + result.adminckey;
            }
            msg += "\n```";
          }
          message.channel.send(msg, {split: true});
          }
      });
    });
  }

}

module.exports = DiscordCommandNotes;
