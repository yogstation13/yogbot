var APIEndpoint = require('../APIEndpoint.js');

class EndpointASayMessage extends APIEndpoint {
  constructor(manager) {
    super(manager, "asaymessage");
  }

  request(data, callback) {
    if (data.ckey === undefined) {

      var error = {
        status: 400,
        response: "Missing ckey parameter."
      }

      return callback(error, undefined);
    }

    if (data.message === undefined) {
      var error = {
        status: 400,
        response: "Missing message parameter."
      }

      return callback(error, undefined);
    }
    var config = this.manager.subsystemManager.getSubsystem("Config").config;
    var discord = this.manager.subsystemManager.getSubsystem("Discord");
    for (var channel of discord.getPrimaryGuild().channels.array()) {
      if (channel.id == config.discord_asay_channel) {
        channel.send("**" + data.ckey + "**: " + data.message);
      }
    }

    var response = {
      status: 200,
      response: "Message sent to ASay channel."
    }

    return callback(undefined, response);
  }
}

module.exports = EndpointASayMessage;
