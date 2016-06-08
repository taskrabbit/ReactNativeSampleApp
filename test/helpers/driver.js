require('./packager');

// APPIUM -----------------
var child_process = require('child_process');
var appiumProc    = child_process.spawn('appium', [
  '-p', '4724',
  '--default-capabilities', '{"fullReset":true}'
]);

var Promise = require('Promise');

var server = {
  host: 'localhost',
  port: 4724 // one off from normal
};

// {
//   host: 'ondemand.saucelabs.com',
//   port: 80,
//   username: process.env.SAUCE_USERNAME,
//   password: process.env.SAUCE_ACCESS_KEY
// };

var loadedAppium = null;

var appiumPromise = new Promise(function (resolve, reject) {
  appiumProc.stdout.on('data', function (data) {
    if (loadedAppium) return;
    console.log('APPIUM: ' + data);

    if (data.indexOf('Appium REST http interface listener started') >= 0) {
      loadedAppium = true;
      resolve(data);
    }
  });
});

appiumProc.stderr.on('data', function (data) {
  console.log('APPIUM err: ' + data);
  appiumProc.kill();
});
process.on('exit', function () {
  appiumProc.kill();
});

// WD -----------------

var realWd = require("wd");
var wd     = require("yiewd");
var color  = require('colors');

// KOA -----------------

var localServer = require("./server");

// Config for Appium

var UNLIMITED = 100000;

var caps = {
  browserName: '',
  'appium-version': '1.5.1',
  platformName: 'iOS',
  platformVersion: '9.3',
  deviceName: 'iPhone 6s',
  autoLaunch: 'true',
  newCommandTimeout: UNLIMITED,
  app: process.cwd() + "/testbuild/test_ios/sample_ios.zip"
};

module.exports = function(callback) {
  console.log("DRIVER: starting it up");

  appiumPromise.then(function () {
    console.log("DRIVER: will init");
    driver = wd.remote(server);

    driver.on('status', function(info) {
      console.log(info.cyan);
    });
    driver.on('command', function(meth, path, data) {
      console.log(' > ' + meth.yellow, path.grey, data || '');
    });

    current = {};

    handler = function(error, el){
      if (error) {
        console.log('error', error);
      }
      else if(typeof el === 'object'){
        console.log("Returned in current");
        current = el;
      }
      else {
        console.log("Returned following string", el);
      }

    };

    quit = function(){
      driver.quit(function(){
        process.exit(1);
      });
    };

    driver.init(caps, function(){
      console.log('driver started');
      callback({
        driver: driver,
        realWd: realWd,
        localServer: localServer,
        wd: wd,
      });
    });
  });
};
