const Subsystem = require('../Subsystem.js');
const spawn = require('child_process').spawn;

class SubsystemUpdater extends Subsystem {
  constructor(manager) {
    super("Updater", manager);
  }

  setup(callback) {
    super.setup();
    callback();
  }

  update(callback) {
    var config = this.manager.getSubsystem("Config").config;

    if (!config.git_update) {
      return;
    }
    process.exit();
    return;

    var git_pull = spawn('cmd.exe', ['/Q', '/c', "update.bat"]);
    git_pull.stdout.on('data', (data) => {
      if (callback != undefined) {
        callback(data.toString());
      }
    });

    git_pull.on('exit', exit_code => {
	   process.exit();

    });
  }
}

module.exports = SubsystemUpdater;
