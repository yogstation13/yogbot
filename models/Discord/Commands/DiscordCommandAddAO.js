const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandWhitelist extends DiscordCommand {

  constructor(subsystem) {
    super("addao", "Give a user AO rank.", 'addao', subsystem);
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

      connection.query("SELECT discord_id FROM `erro_player` WHERE `ckey` = ?", [ckey], (error, results, fields) => {
        if (error) {
          message.reply("Error running select query, try again later.");
          return;
        }
        if (results.length == 0) {
          message.reply("No user with this Ckey has a linked Discord account!");
          return;
        }
        if (results.length > 1) {
          message.reply("More than 1 of this ckey with a Discord ID, this makes no sense at all!");
          return;
        }
      
        message.guild.fetchMember(results[0].discord_id)
          .then((member) => {
            if(member.roles.has(config.discord_ao_role)) {
              message.reply("Player already has AO role");
            } else {
              member.addRole(config.discord_ao_role);
            }
          })
          .catch(() => message.reply("Cannot find discord account for player"));
      })

      connection.query('SELECT * FROM `erro_admin` WHERE `ckey` = ?', [ckey], (error, results, fields) => {
        if (error) {
          message.reply("Error running select query, try again later.");
        }

        if (results.length > 0) {
          message.reply("Player already has a rank in game.");
        }
        else {
          connection.query("INSERT INTO `erro_admin` (`ckey`, `rank`) VALUES (?, 'Admin Observer');", [ckey], (error, results, fields) => {
            connection.release();

            if (error) {
              message.reply("Error running insert query, try again later.");
              return;
            }
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
