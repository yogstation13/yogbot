var APIEndpoint = require('../APIEndpoint.js');

class EndpointAdminless extends APIEndpoint {
  constructor(manager) {
    super(manager, "adminless");
  }

  request(data, callback) {
    if (data === undefined) {

      var error = {
        status: 400,
        response: "Missing data parameter."
      }

      return callback(error, undefined);
    }
    var config = this.manager.subsystemManager.getSubsystem("Config").config;
    var discord = this.manager.subsystemManager.getSubsystem("Discord");
    for (var channel of discord.getPrimaryGuild().channels.array()) {
      if (channel.id == config.discord_important_admin_channel) {
        channel.send("@here " + data);
      }
    }

    var response = {
      status: 200,
      response: "Message sent to the important admin channel."
    }

    return callback(undefined, response);
  }
}

module.exports = EndpointAdminless;
