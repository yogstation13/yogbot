var fs = require('fs');

class ByondAPI {
  constructor(subsystemManager) {
    this.subsystemManager = subsystemManager;
    this.endpoints = []

    this.loadEndpoints();
  }

  loadEndpoints() {
    fs.readdir("./models/Byond/Endpoints/", (err, files) => {
      files.forEach(file => {
        var endpointPath = file.split(".")[0];

        const EndpointClass = require('./Endpoints/' + endpointPath + '.js');
        this.endpoints.push(new EndpointClass(this));

      });
    });
  }

  request(method, data, callback) {
    for (var i = 0; i < this.endpoints.length; i++) {
      if (this.endpoints[i].method === method) {
        return this.endpoints[i].request(data, callback);
      }
    }

    var error = {
      status: 404,
      response: "Method not found exception."
    }

    callback(error, undefined);
  }
}

module.exports = ByondAPI;
