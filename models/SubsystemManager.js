const winston = require("winston");

class SubsystemManager {
  constructor() {
    this.subsystems = [];
    this.uninitializedSubsystems = [];
    this.logger;

    this.formatSimple = winston.format.printf(info => {
      return `[${info.level}] ${info.message}`;
    });

    this.format = winston.format.printf(info => {
      return `${info.timestamp} [${info.level}]: ${info.message}`;
    });

    this.createLogger();
    this.loadSystems();
  }

  loadSystems() {
    const fs = require('fs');
    fs.readdir("./models/Subsystems/", (err, files) => {
      if (err) {
        return this.logger("error", err);
      }

      files.forEach(file => {
        var subsystemPath = file.split(".")[0];

        const SubsystemClass = require('./Subsystems/' + subsystemPath + '.js');
        this.uninitializedSubsystems.push(new SubsystemClass(this));

      });

      this.organizeSystems();
      this.logger.log("info", "Initializing subsystems.");
      this.initSystems();
      this.logger.log("info", "Finished initializing subsystems.");
    });

  }

  organizeSystems() {
    while (true) {
      if (this.uninitializedSubsystems.length < 1)
        break;

      var highestPriority = 0;
      var indexOfNextPriority = 0;
      for (var i = 0; i < this.uninitializedSubsystems.length; i++) {
        if (this.uninitializedSubsystems[i].priority > highestPriority) {
          indexOfNextPriority = i;
          highestPriority = this.uninitializedSubsystems[i].priority;
        }
      }
      this.subsystems.push(this.uninitializedSubsystems[indexOfNextPriority]);
      this.uninitializedSubsystems.splice(indexOfNextPriority, 1);
    }
  }

  initSystems() {
    var currentSS = 0;

    var setupNextSubsystem = () => {

      if (currentSS >= this.subsystems.length) {
        this.logger.log("info", "Finished initializing subsystems.");
        return;
      }

      this.subsystems[currentSS].setup((err) => {
        if (err) {
          return this.logger.log("error", "Subsystem " + this.subsystems[currentSS].id + " initialization failed: " + err);
        }

        currentSS++;
        setupNextSubsystem();
      });
    };

    setupNextSubsystem();
  }

  createLogger() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), this.formatSimple),
          colorize: true,
          json: false
        }),
        new winston.transports.File({
          filename: "logs/error.log",
          level: 'error',
          format: winston.format.combine(winston.format.timestamp(), this.format)
        }),
        new winston.transports.File({
          filename: "logs/info.log",
          format: winston.format.combine(winston.format.timestamp(), this.format)
        })
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: "logs/exception.log" })
      ]
    });
  }

  getSubsystem(subsystemID) {
    for (var subsystem of this.subsystems) {
      if (subsystem.id === subsystemID) {
        return subsystem;
      }
    }
  }
}

module.exports = SubsystemManager;
