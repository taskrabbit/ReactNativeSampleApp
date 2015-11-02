var React = require('react-native');
var {
  StatusBarIOS
} = React;

var StatusBar = {
  setNetworkActive: function(active) {
    StatusBarIOS.setNetworkActivityIndicatorVisible(active);
  },

  setHidden: function(hidden) {
    StatusBarIOS.setHidden(hidden);
  }
};

module.exports = StatusBar;
