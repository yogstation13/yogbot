var fs = require('fs');

const BanManager = require('./BanManager.js');
const LibraryManager = require('./LibraryManager.js');

class ByondAPI {
  constructor(subsystemManager) {
    this.subsystemManager = subsystemManager;
    this.endpoints = []

    this.loadEndpoints();
    this.banManager = new BanManager(subsystemManager);
    this.libraryManager = new LibraryManager(subsystemManager);
    this.serverStatus = {
      players: 0,
      online: false
    };

    var serverCheckTimer = setInterval(() => {
      this.pingServer()
    }, 60000);
    this.pingServer()
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

  pingServer() {
    var byondConnector = this.subsystemManager.getSubsystem("Byond Connector").byondConnector;
    var StringUtils = require('../Utils/String.js');

    byondConnector.request("?status", (results) => {
      if ('error' in results) {
        this.serverStatus.online = false;
        this.serverStatus.players = 0;
      }
      else {
        this.serverStatus = StringUtils.URL2Array(results.data);
        this.serverStatus.online = true;
      }
    });
  }
}

module.exports = ByondAPI;
