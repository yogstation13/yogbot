var http2byond = require('http2byond');

class ByondConnector {

  constructor(ip, port) {
    this.ip = ip;
    this.port = port;
  }

  request(query, callback) {
    var form = {
      ip: this.ip,
      port: this.port,
      topic: query
    }

    http2byond(form, function (body, err) {
      if (err) throw err;
      callback(body, err);
    });
  }

}

module.exports = ByondConnector
