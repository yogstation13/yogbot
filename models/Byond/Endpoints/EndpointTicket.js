var APIEndpoint = require('../APIEndpoint.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class EndpointTicket extends APIEndpoint {
  constructor(manager) {
    super(manager, "ticket");
  }

  request(data, callback) {
    var config = this.manager.subsystemManager.getSubsystem("Config").config;
    var discord = this.manager.subsystemManager.getSubsystem("Discord");

    var webhook_data = {
        username: data.roundid,
        content: (("**" + data.user + ", Ticket #" + data.ticketid + ":** " + data.message) || "").replace(/@everyone/gi, "*@*everyone").replace(/@here/gi, "*@*here")
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", config.ticket_webhook_url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(webhook_data));

    var response = {
      status: 200,
      response: "Message sent to Ticket channel."
    }

    return callback(undefined, response);
  }
}

module.exports = EndpointTicket;
