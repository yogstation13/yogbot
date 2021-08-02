const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandWhitelist extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "addao";
    this.description = "Give a user AO rank.";
    this.permission = "addao";
    this.subsystem = subsystem;
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if (args.length < 1) {
      message.reply("Usage is `" + config.discord_command_character + "addao [ckey]`");
      return;
    }

    var ckey = args[0];

    var dbSubsystem = this.subsystem.manager.getSubsystem("Database");

    dbSubsystem.pool.getConnection((err, connection) => {
      if (err) {
        message.reply("Error contacting database, try again later.");
      }
      connection.query('SELECT * FROM `web_admins` WHERE `username` = ?', [ckey], (error, results, fields) => {
        if (error) {
          message.reply("Error running select query, try again later.");
        }

        if (results.length > 0) {
          message.reply("Player already has a rank.");
        }
        else {
          connection.query("INSERT INTO `web_admins` (`username`, `password`, `salt`, `rank`) VALUES (?, '', '', 12);", [ckey], (error, results, fields) => {
            connection.release();

            if (error) {
              message.reply("Error running insert query, try again later.");
            }

            if (results.affectedRows < 1) {
              message.reply("Player was not inserted.");
            }
            else {
              this.subsystem.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") added a new AO: " + ckey);
              message.reply("`" + ckey + "` has been give the AO role.");
            }
          });
        }
      });
    });
  }

}

module.exports = DiscordCommandWhitelist;
