const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandRemoveMentor extends DiscordCommand {

  constructor(subsystem) {
    super("removementor", "Remove a users Mentor rank.", 'removementor', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if (args.length < 1) {
      message.reply("Usage is `" + config.discord_command_character + "removementor [ckey]`");
      return;
    }

    var ckey = args[0];

    var dbSubsystem = this.subsystem.manager.getSubsystem("Database");

    dbSubsystem.pool.getConnection((err, connection) => {
      if (err) {
        message.reply("Error contacting database, try again later.");
      }

      connection.query('SELECT discord_id FROM `' + dbSubsystem.format_table_name('player') + '` WHERE `ckey` = ?', [ckey], (error, results, fields) => {
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
            if (member.roles.has(config.discord_mentor_role)) {
              member.removeRole(config.discord_mentor_role);
            } else {
              message.reply("Player does not have AO role");
            }
          })
          .catch(() => message.reply("Cannot find discord account for player"));
      })

      connection.query('DELETE FROM `' + dbSubsystem.format_table_name('mentor') + '` WHERE `ckey` = ?', [ckey], (error, results, fields) => {
        if (error) {
          message.reply("Error running delete query, try again later.");
        }

        if (results.affectedRows < 1) {
          message.reply("Player was not removed.");
        } else {
          this.subsystem.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") removed an mentor: " + ckey);
          message.reply("`" + ckey + "` has removed the mentor role.");
        }
      });
    });
  };
}

module.exports = DiscordCommandRemoveMentor;
