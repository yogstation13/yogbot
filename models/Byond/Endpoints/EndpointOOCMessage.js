var APIEndpoint = require('../APIEndpoint.js');
var stringUtils = require('../../Utils/String.js');

class EndpointOOCMessage extends APIEndpoint {
  constructor(manager) {
    super(manager, "oocmessage");
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
    var message = stringUtils.unescapeHtml(data.message);
    for (var channel of discord.getPrimaryGuild().channels.array()) {
      if (channel.id == config.discord_channel_ooc) {
        channel.send("**" + data.ckey + "**: " + message);
      }
    }

    var response = {
      status: 200,
      response: "Message sent to OOC channel."
    }

    return callback(undefined, response);
  }
}

module.exports = EndpointOOCMessage;
