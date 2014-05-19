var duplexer = require('duplexer'),
    spawn = require('child_process').spawn;

module.exports = function(command, args) {
  var subprocess = spawn(command, args);
  return duplexer(subprocess.stdin, subprocess.stdout);
};
