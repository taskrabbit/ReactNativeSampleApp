var server    = require("./server");
var dispatcher = require("../helpers/dispatcher");
var assign     = require('object-assign');

var Bootstrap = function() {
  this.actions = [];
};

Bootstrap.prototype.login = function() {
  this.addAction("LOGIN_USER", dispatcher.login());
  return this;
};

Bootstrap.prototype.time = function(time, timezoneOffsetHours) {
  this.addAction("STUB_TIME", {time: time, timezoneOffset: -(timezoneOffsetHours * 60)});
  return this;
};

Bootstrap.prototype.nav = function(path) {
  this.addAction("LAUNCH_ROUTE_PATH", {routePath: path});
  return this;
};

Bootstrap.prototype.show = function(componentName, props, state) {
  var defaultProps = {
    currentRoute: {}
  };

  this.addAction("TEST_COMPONENT_ROUTE", {
    routeUnderTest: {
      component: componentName,
      passProps: assign(defaultProps, props),
      setState: state
    }
  });
  return this;
};

Bootstrap.prototype.addAction = function(type, options) {
  this.actions.push({type: type, options: options});
  return this;
};

Bootstrap.prototype.launch = function* (driver, options) {
  if (options && options.debug === true) {
    yield this.debug(driver);
  }

  var url = 'test/bootstrap.json';

  for (var i=0; i<this.actions.length; i++) {
    var action = this.actions[i];
    if (i > 0) {
      yield driver.sleep(50);
    }
    server.get(url, { actions: [action] });
    yield driver.elementById('Bootstrap').click();
  }
  return this;
};

Bootstrap.prototype.debug = function* (driver) {
  console.log('Bootstrap debugging');

  for (var i=0; i<50; i++) {
    // Open the menu
    try {
      yield driver.elementById('DevMenu').click();
      break;
    }
    catch (e) {
      // wait for a bit
      yield driver.sleep(500);
    }
  }

  for (var i=0; i<50; i++) {
    // Click on the Menu
    // If Debug in Chrome is not displayed then Disable Chrome Debugging should be
    try {
      try {
        yield driver.elementById('Debug in Chrome').click();
      }
      catch (e) {
        yield driver.elementById('Disable Chrome Debugging');
      }
      break;
    }
    catch (e) {
      // wait for a bit
      yield driver.sleep(500);
    }
  }

  for (var i=0; i<50; i++) {
    // wait til it reloads
    try {
      yield driver.elementById('ResetTest');
      break;
    }
    catch (e) {
      // wait for a bit
      yield driver.sleep(500);
    }
  }
};

module.exports = function() {
  return new Bootstrap();
};
