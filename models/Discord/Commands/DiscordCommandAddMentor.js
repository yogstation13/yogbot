const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandAddMentor extends DiscordCommand {

  constructor(subsystem) {
    super("addmentor", "Give a user Mentor rank.", 'addmentor', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if (args.length < 1) {
      message.reply("Usage is `" + config.discord_command_character + "addmentor [ckey]`");
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
            if(member.roles.has(config.discord_mentor_role)) {
              message.reply("Player already has Mentor role");
            } else {
              member.addRole(config.discord_mentor_role);
            }
          })
          .catch(() => message.reply("Cannot find discord account for player"));
      })

      connection.query('SELECT * FROM `erro_mentor` WHERE `ckey` = ?', [ckey], (error, results, fields) => {
        if (error) {
          message.reply("Error running select query, try again later.");
        }

        if (results.length > 0) {
          message.reply("Player already has mentor in game.");
        }
        else {
          connection.query("INSERT INTO `erro_mentor` (`ckey`, `position`) VALUES (?, 'Mentor');", [ckey], (error, results, fields) => {
            connection.release();

            if (error) {
              message.reply("Error running insert query, try again later.");
              return;
            }
            this.subsystem.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") added a new mentor: " + ckey);
            message.reply("`" + ckey + "` has been given the Mentor role.");
            }
          });
        }
      });
    });
  }

}

module.exports = DiscordCommandAddMentor;
