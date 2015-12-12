// ios/node_modules/react-native/packager/packager.sh --port 9091
// node /Users/brian/taskrabbit/tasker/ios/node_modules/react-native/packager/packager.js --port 9091

var pwd  = process.cwd();
var path = pwd + '/node_modules/react-native/packager/packager.sh'

var child_process = require('child_process');
var packager      = child_process.spawn(path, ['--port', '9091']);

var packagerReady = false;

packager.stdout.on('data', function (data) {
  if (packagerReady) return;
  console.log('PACKAGER: ' + data);
  if (data.indexOf('React packager ready.') >=0) {
    packagerReady = true;
  }
});

packager.stderr.on('data', function (data) {
  console.log('PACKAGER err: ' + data);
});

packager.on('close', function (code) {
  console.log('PACKAGER exited with code: ' + code);
});


process.on('exit', function () {
  packager.kill();
});

module.exports = packager;
