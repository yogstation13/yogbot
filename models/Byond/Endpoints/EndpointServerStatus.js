var APIEndpoint = require('../APIEndpoint.js');
var Discord = require('discord.js');

class EndpointASayMessage extends APIEndpoint {
  constructor(manager) {
    super(manager, "roundstatus");
  }

  request(data, callback) {
    if (data.status === undefined) {

      var error = {
        status: 400,
        response: "Missing status parameter."
      }

      return callback(error, undefined);
    }

    var config = this.manager.subsystemManager.getSubsystem("Config").config;
    var discord = this.manager.subsystemManager.getSubsystem("Discord");

    if (data.status == "lobby") {

      var embed = new Discord.RichEmbed();

      embed.setAuthor("New round notifier", "http://i.imgur.com/GPZgtbe.png");
      embed.setDescription("<@&" + config.discord_subscriber_role + "> A new round is about to begin! Join now at " + config.server_join_address);
      embed.addField("Map Name", data.map_name, true);
      embed.addField("Revsision", data.revision, true);
      embed.addField("Round Number", data.round, true);
      embed.addField("Changelog", "No Changes", true);
      embed.setColor("62f442");

      for (var channel of discord.getPrimaryGuild().channels.array()) {
        if (channel.id == config.discord_public_channel) {
          channel.sendEmbed(embed);
        }
      }
      discord.client.user.setGame("Round Starting");
    }
    else if (data.status == "ingame") {
      discord.client.user.setGame("InGame");
    }
    else {
      discord.client.user.setGame("Round Ending");
    }


    var response = {
      status: 200,
      response: "Status set."
    }

    return callback(undefined, response);
  }
}

module.exports = EndpointASayMessage;
