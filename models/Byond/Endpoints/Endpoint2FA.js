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

    var error = null;
    var user_id = null;

    dbSubsystem.pool.getConnection((err, connection) => {
      if (err) {
        connection.release();
        return;
      }

      connection.query("SELECT discord_id FROM `erro_player` WHERE `ckey` = ?", [data.ckey], (error, results, fields) => {
        if (error) {
          this.manager.subsystemManager.logger.log("error", error)
          return;
        }
        if (results.length == 0) {
          this.manager.subsystemManager.logger.log("error", "No associated ID")
          return;
        }
        if (results.length > 1) {
          this.manager.subsystemManager.logger.log("error", "Multiple associated IDs")
          return;
        }
        user_id = results[0].discord_id;

        discord.getPrimaryGuild().fetchMember(user_id)
          .then((member) => {
            var embed = new Discord.RichEmbed();
            embed.setDescription("New connection for <@" + user_id + "> please confirm this is you.");
            embed.addField("IP Address", data.ip, true);
            embed.addField("CID", data.cid, true);
            embed.addField("CKey", data.ckey, true);
            for (var channel of discord.getPrimaryGuild().channels.array()) {
              if (channel.id == config.discord_channel_multi_factor) {
                channel.send(embed).then(message => {
                  message.react("👍").then(() =>
                    message.react("👎").then(() => {
                      const filter = (reaction, user) => {
                        return ["👍", "👎"].includes(reaction.emoji.name) && user.id === user_id
                      }
                      message.awaitReactions(filter, {max: 1, time: 60000}).then(collected => {
                        const reaction = collected.first();

                        if(reaction && reaction.emoji.name == "👍") {
                          var byondConnector = this.manager.subsystemManager.getSubsystem("Byond Connector").byondConnector;
                          byondConnector.request("?mfa_verify&ckey=" + encodeURIComponent(data.ckey) + "&ip=" + encodeURIComponent(data.ip) + "&cid=" + encodeURIComponent(data.cid), (results) => {
                            if ('error' in results) {
                              message.channel.send(results.error);
                            }
                          });
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
              if (channel.id == config.discord_channel_multi_factor) {
                channel.send("**" + data.ckey + " MFA error**: Unable to find user " + user_id + " in guild.");
              }
            }
          });

      })

      connection.release();
    });

    var response = {
      status: 200,
      response: "Verification sent."
    };

    return callback(undefined, response);
	}

}

module.exports = EndpointMFA;