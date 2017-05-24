const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandAddUser extends DiscordCommand {

  constructor(subsystem) {
    super("addao", "Add an admin to the game.", 'adduser', subsystem);
  }

  onRun(message, permissions, args) {
    var httpSubsystem = this.subsystem.manager.getSubsystem("HTTP");

    dbSubsystem.pool.getConnection(function(err, connection) {
      if(err) {
        message.reply("Error contacting database, try again later.");
      }

      connection.query('UPDATE `erro_player` SET `job_whitelisted` = ? WHERE `ckey` = ?', [whitelistInteger, ckey], function (error, results, fields) {
        connection.release();

        if (error) {
          message.reply("Error running query, try again later.");
        }

        if(results.affectedRows  < 1) {
          message.reply("Player was not found, typo maybe?");
        } else {
          message.reply("`" + ckey + "`'s job whitelist was set to `" + whitelist + "`");
        }
      });
    });


  }

}

module.exports = DiscordCommandAddUser;
