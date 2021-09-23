var APIEndpoint = require('../APIEndpoint.js');
var Discord = require('discord.js');

class EndpointMFA extends APIEndpoint {
	constructor(manager) {
	super(manager, "mfarequest");
	}

	request(data, callback) {
	
    var config = this.manager.subsystemManager.getSubsystem("Config").config;
    var discord = this.manager.subsystemManager.getSubsystem("Discord");
    var dbSubsystem = this.manager.subsystemManager.getSubsystem("Database");

    var error;
    var user_id;

    dbSubsystem.pool.getConnection((err, connection) => {
      if (err) {
        connection.release();
        error = "Error contacting database.";
        return;
      }

      user_id = getByCkey(connection, data.ckey);

      if (user_id === null)
        error = "User ID not linked!"

      connection.release();
    });

    var response;

    if(error !== null) {
      for (var channel of discord.getPrimaryGuild().channels.array()) {
        if (channel.id == config.discord_channel_ooc) {
          channel.send("**" + data.ckey + " MFA error**: " + error);
        }
      }
      response = {
        status: 500,
        response: error
      }
      return callback(undefined, response)
    }

    discord.getPrimaryGuild().guild.fetchMember(user_id)
        .then((member) => {
          var embed = new Discord.RichEmbed();
          embed.setDescription("New connection for " + member.mention + " please confirm this is you.");
          embed.addField("IP Address", data.ip, true);
          embed.addField("CID", data.cid, true);
          embed.addField("CKey", data.ckey, true);
          for (var channel of discord.getPrimaryGuild().channels.array()) {
            if (channel.id == config.discord_channel_ooc) {
              channel.sendEmbed(embed).then(message => {
                message.react("<:Approve:731199508066599085>").then(() =>
                  message.react("<:Disapprove:731199523074080820>").then(() => {
                    const filter = (reaction, user) => {
                      return ["<:Approve:731199508066599085>", "<:Disapprove:731199523074080820>"].includes(reaction.emoji.name) && user.id === user_id
                    }
                    message.awaitReactions({filter, max: 1, time: 60000}).then(collected => {
                      const reaction = collected.first();

                      if(reaction.emoji.name == "<:Approve:731199508066599085>") {
                        var byondConnector = this.manager.subsystemManager.getSubsystem("Byond Connector").byondConnector;
                        byondConnector.request("?mfa_verify&ckey=" + encodeURIComponent(data.ckey) + "&ip=" + encodeURIComponent(data.ip) + "&cid=" + encodeURIComponent(data.cid), (results) => {
                          if ('error' in results) {
                            message.channel.send(results.error);
                          }
                        });
                      } else {
                        // TODO: Handle negative resposne
                      }
                    });
                  })
                )
              });
            }
          }
        })
        .catch(() => {
          for (var channel of discord.getPrimaryGuild().channels.array()) {
            if (channel.id == config.discord_channel_ooc) {
              channel.send("**" + data.ckey + " MFA error**: Unable to find user in guild.");
            }
          }
          response = {
            status: 500,
            response: "Unable to find user in guild."
          }
          return callback(undefined, response)
        });

    response = {
      status: 200,
      response: "Verification sent."
    }
    return callback(undefined, response);
	}
}

module.exports = EndpointMFA;

function getByCkey(connection, ckey) {
	connection.query("SELECT discord_id FROM `erro_player` WHERE `ckey` = ?", [ckey], (error, results, fields) => {
		if (error) {
			return;
		}
		if (results.length == 0) {
			return;
		}
		if (results.length > 1) {
			return;
		}
		return results[0].discord_id;
  })
}