const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandWhitelist extends DiscordCommand {

  constructor(subsystem) {
    super("whitelist", "Toggle the job whitelist on a player.", 'whitelist', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if (args.length < 2) {
      message.reply("Usage is `" + config.discord_command_character + "whitelist [ckey] [true/false]`");
      return;
    }

    var ckey = args[0];
    var whitelist = args[1];
    var whitelistInteger = 0;

    if (whitelist == "true") {
      whitelistInteger = 1;
    }
    else if (whitelist == "false") {
      whitelistInteger = 0;
    }
    else {
      message.reply("please input either true or false.")
    }

    var dbSubsystem = this.subsystem.manager.getSubsystem("Database");

    dbSubsystem.pool.getConnection((err, connection) => {
      if (err) {
        message.reply("Error contacting database, try again later.");
      }

      connection.query('UPDATE `' + dbSubsystem.format_table_name('player') + '` SET `job_whitelisted` = ? WHERE `ckey` = ?', [whitelistInteger, ckey], (error, results, fields) => {
        connection.release();

        if (error) {
          message.reply("Error running query, try again later.");
        }

        if (results.affectedRows < 1) {
          message.reply("Player was not found, typo maybe?");
        }
        else {
          this.subsystem.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") set " + ckey + " whitelist status to " + whitelist);
          message.reply("`" + ckey + "`'s job whitelist was set to `" + whitelist + "`");
        }
      });
    });
  }

}

module.exports = DiscordCommandWhitelist;
