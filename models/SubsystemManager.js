class SubsystemManager {
  constructor() {
    this.subsystems = [];
    this.uninitializedSubsystems = [];

    this.loadSystems();
  }

  loadSystems() {
    const fs = require('fs');
    fs.readdir("./models/Subsystems/", (err, files) => {
      if (err) {
        return console.log(err);
      }

      files.forEach(file => {
        var subsystemPath = file.split(".")[0];

        const SubsystemClass = require('./Subsystems/' + subsystemPath + '.js');
        this.uninitializedSubsystems.push(new SubsystemClass(this));

      });

      this.organizeSystems();
      console.log("Initializing subsystems.");
      this.initSystems();
      console.log("Finished initializing subsystems.");
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
      this.subsystems[currentSS].setup((err) => {
        if (err) {
          console.log("Subsystem " + this.subsystems[currentSS].id + " initialization failed: " + err);
          return;
        }

        currentSS++;
        setupNextSubsystem();
      });
    };

    setupNextSubsystem();
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
