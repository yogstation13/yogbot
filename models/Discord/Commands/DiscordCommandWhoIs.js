const DiscordCommand = require('../DiscordCommand.js');


class DiscordCommandWhoIs extends DiscordCommand {

  constructor(subsystem) {
    super("whois", "Checks a Discord users ckey if they have their accounts linked.", null, subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if(args.length < 1) {
      message.reply("Usage is `" + config.discord_command_character + "whois [@UserName/Ckey]`");
      return;
    }
    var user = undefined;
    var provided_ckey = args.join("").toLowerCase().replace(/[^a-z0-9@]/gi, "");

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
      
      if(userID) {
        this.getByDiscordID(connection, userID, message)
      } else {
        this.getByCkey(connection, provided_ckey, message)
      }
        
      connection.release();
    });
  }

  getByDiscordID(connection, user, message) {
    connection.query('SELECT * FROM `' + this.subsystem.manager.getSubsystem("Database").format_table_name('player') + '` WHERE `discord_id` = ?', [user.id], (error, results, fields) => {
        if (error) {
          message.reply( "Error running select query, try again later.");
          return;
        }
        if (results.length == 0) {
          message.reply("No linked BYOND account found for this user.");
          return;
        }
        if (results.length > 1) {
          message.reply("More than one BYOND account linked to this ID. This shouldn't happen!");
          return;
        }
  
        var ckey = results[0].ckey
        message.reply(user + " belongs to the ckey '" + ckey +"'");
      })
  }
  
  getByCkey(connection, ckey, message) {
    connection.query('SELECT discord_id FROM `' + this.subsystem.manager.getSubsystem("Database").format_table_name('player') + '` WHERE `ckey` = ?', [ckey], (error, results, fields) => {
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
          .then((member) => message.reply(ckey + " belongs to " + member.user.username + "#" + member.user.discriminator))
          .catch(() => message.reply("Can't resolve user from ID"));
      })
  }

}

module.exports = DiscordCommandWhoIs;
