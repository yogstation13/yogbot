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
    var provided_ckey = args.join("");
    var punctuation = [".", ",", "-", "_", ";", ":"];
    for(var i = 0; i< punctuation.length; i++) {
      provided_ckey = provided_ckey.split(punctuation[i]).join("");
    }

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
      var DB_response;
      
      if(userID) {
        DB_response = getByDiscordID(connection, userID)
      } else {
        DB_response = getByCkey(connection, provided_ckey, message)
      }
      
      if(!DB_response) DB_response = "Something went wrong"
        
      message.reply(DB_response)
      connection.release();
    });
  }

}

function getByDiscordID(connection, user) {
  connection.query("SELECT * FROM `erro_player` WHERE `discord_id` = ?", [user.id], (error, results, fields) => {
      if (error) {
        return "Error running select query, try again later.";
      }
      if (results.length == 0) {
        return "No linked BYOND account found for this user.";
      }
      if (results.length > 1) {
        return "More than one BYOND account linked to this ID. This shouldn't happen!";
      }

      var ckey = results[0].ckey
      return (user + " belongs to the ckey '" + ckey +"'")
    })
}

function getByCkey(connection, ckey, message) {
  connection.query("SELECT discord_id FROM `erro_player` WHERE `ckey` = ?", [ckey], (error, results, fields) => {
      if (error) {
        return "Error running select query, try again later.";
      }
      if (results.length == 0) {
        return "No user with this Ckey has a linked Discord account!";
      }
      if (results.length > 1) {
        return "More than 1 of this ckey with a Discord ID, this makes no sense at all!";
      }
      var guildMember = message.guild.fetchMember(results[0].discord_id);
      if(!guildMember) return "Can't resolve user from ID"
      
      return (ckey + " belongs to " + guildMember.user.username + "#" + guildMember.user.discriminator)
    })
}

module.exports = DiscordCommandWhoIs;
