var React = require('react-native');
var {
  StatusBarIOS
} = React;

var StatusBar = {
  setNetworkActive: function(active) {
    StatusBarIOS.setNetworkActivityIndicatorVisible(active);
  }
};

module.exports = StatusBar;
