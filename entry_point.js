var fork = require('child_process').fork;

var rebootFunction = function (exitCode) {
  console.log("Child process died. Rebooting...");
  console.log("---------------------------------");
  child = fork('./app.js');
  child.on('exit', rebootFunction);
};

var child = fork('./app.js');
child.on('exit', rebootFunction);
