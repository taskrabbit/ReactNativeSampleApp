// #IPROMISE -----------------
require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
global.expect = chai.expect;
var should = chai.should();
var bootAppium = require('./driver');

var resetEachTime = false;

// GLOBAL TRACKING -----------------
var rootDriver = null;
var localServer = null;
var allPassed = true;
var timeoutTime = 300000;

var resetSimulator = function(callback) {
  if (!rootDriver) {
    callback(true);
    return;
  }

  localServer.before();

  rootDriver.run(function* () {
    // wait for it to show up from appium
    var i = 0;
    while (i < 50) {
      try {
        // best-case first
        // reset data
        yield rootDriver.elementById('ResetTest').click();
        break;
      }
      catch (e) { }

      try {
        // if on crashed (red) app
        yield rootDriver.elementById('redbox-reload').click();
      }
      catch (e) { }

      try {
        // is there an alert?
        yield rootDriver.elementByName('OK').click();
      }
      catch (e) { }

      try {
        // now does it work?
        // reset data
        yield rootDriver.elementById('ResetTest').click();
        break;
      }
      catch (e) { }

      try {
        // ok, fine. shake it and click reload
        yield rootDriver.shake();
        yield rootDriver.elementById('Reload').click();
      }
      catch (e) { }

      // wait for a bit
      yield rootDriver.sleep(250);
      i++;
    }

    if (i >= 50) {
      // it's not coming back
      console.log("SIMULATOR DIED");
      callback(true);
    }
    else {
      callback(false);
    }
  });
};

var launchSimulator = function(callback) {
  bootAppium(function(options) {
    console.log("booted!")
    rootDriver  = options.driver;
    realWd      = options.realWd;
    wd          = options.wd;
    localServer = options.localServer;

    chaiAsPromised.transferPromiseness = realWd.transferPromiseness;

    resetSimulator(callback);
  });
};

var quitSimulator = function(callback) {
  if (!rootDriver) {
    callback();
  }
  else {
    rootDriver.run(function* () {
      console.log("quitting");
      try {
        yield rootDriver.quit();
        console.log("quit");
      }
      catch(e) {
        console.log("ERROR quitting: " + e);
      }

      rootDriver = null;
      callback();
    });
  }
};

// BEFORE ENTIRE SUITE -----------------

before(function (done) {
  // console.log("before suite");
  this.timeout(timeoutTime);
  done();
});

// AFTER ENTIRE SUITE -----------------

after(function (done) {
  this.timeout(timeoutTime);
  // console.log("after suite");
  quitSimulator(function() {
    done();
  });
});

// BEFORE EACH TEST -----------------

var testCount = 0;
beforeEach(function (done) {
  this.timeout(timeoutTime);
  testCount++;
  // console.log("before each: " + testCount);
  console.log("beforeEach");
  resetSimulator(function(error) {
    if (error) {
      console.log("error; will quit");
      quitSimulator(function() {
        launchSimulator(function(error) {
          if (error) {
            throw ("unable to launch simulator");
          }
          else {
            done();
          }
        });
      });
    }
    else {
      done();
    }
  });

});

// AFTER EACH TEST -----------------

afterEach(function(done) {
  this.timeout(timeoutTime);
  console.log("afterEach");
  allPassed = allPassed && this.currentTest.state === 'passed';
  localServer.after();

  if (resetEachTime) {
    quitSimulator(function() {
      done();
    });
  }
  else {
    done();
  }
});

// EXPORT HELPER -----------------

// override "it" to remove test boilerplate
var newIt = function(name, callback) {
  it(name, function(done) {
    this.timeout(timeoutTime);
    rootDriver.run(function* () {
      yield callback(rootDriver, done)
    });
  });
};

// override "it" to remove test boilerplate
var itOnly = function(name, callback) {
  it.only(name, function(done) {
    this.timeout(timeoutTime);
    rootDriver.run(function* () {
      yield callback(rootDriver, done)
    });
  });
};

// override "it" to remove test boilerplate
var itPending = function(name, callback) {
  it.skip(name, function(done) {
    this.timeout(timeoutTime);
    rootDriver.run(function* () {
      yield callback(rootDriver, done)
    });
  });
};

export default newIt;
export {itOnly, itPending};
