class SubsystemManager {
  constructor() {
    this.subsystems = [];
    this.uninitializedSubsystems = [];

    this.loadSystems();

  }

  loadSystems() {
    const fs = require('fs');
    fs.readdir("./models/Subsystems/", (err, files) => {
      files.forEach(file => {
        var subsystemPath = file.split(".")[0];

        const SubsystemClass = require('./Subsystems/' + subsystemPath + '.js');
        this.uninitializedSubsystems.push(new SubsystemClass(this));

      });

      this.organizeSystems();
      console.log("Initializing subsystems.")
      this.initSystems();
      console.log("Finished initializing subsystems.")
    });

  }

  organizeSystems() {
    while (true) {
      if (this.uninitializedSubsystems.length < 1)
        break;
      let systemToBeInitialized = 0;

      let highestPriority = 0;
      let indexOfNextPriority = 0;
      for (var i = 0; i < this.uninitializedSubsystems.length; i++) {
        if (this.uninitializedSubsystems[i].priority > highestPriority) {
          indexOfNextPriority = i;
          highestPriority = this.uninitializedSubsystems[i].priority;
        }
      }
      this.subsystems.push(this.uninitializedSubsystems[indexOfNextPriority]);
      this.uninitializedSubsystems.splice(indexOfNextPriority, 1)
    }
  }

  initSystems() {
    let currentSS = 0;
    while (true) {
      if (currentSS > this.subsystems.length - 1) {
        break;
      }
      if (this.subsystems[currentSS].status == 0) {
        this.subsystems[currentSS].setup();
        continue;
      }
      if (this.subsystems[currentSS].status == 2) {
        currentSS++;
        continue;
      }
      if (this.subsystems[currentSS].status == 3) {
        console.log("[ERROR] The " + this.subsystems[currentSS].id + " subsystem failed to initialize with the error: " + this.subsystems[currentSS].error);
        process.exit();
        break;
      }
    }
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
