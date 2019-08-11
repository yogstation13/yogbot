var APIEndpoint = require('../APIEndpoint.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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

    var webhook_data = {
        username: data.ckey,
        content: (data.message || "").replace(/@everyone/gi, "*@*everyone").replace(/@here/gi, "*@*here")
    }

    var ckey = data.ckey.split("/")[0]
    var user = discord.client.guilds.get(config.discord_guild).fetchMembers(ckey, 1)[0]
    if(user && user.avatarURL)
        webhook_data.avatar_url = user.avatarURL

    var xhr = new XMLHttpRequest();
    xhr.open("POST", config.asay_webhook_url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(webhook_data));

    var response = {
      status: 200,
      response: "Message sent to ASay channel."
    }

    return callback(undefined, response);
  }
}

module.exports = EndpointASayMessage;
