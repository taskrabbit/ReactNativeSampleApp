var React = require('react-native');
var {
  StatusBar,
  StatusBarIOS
} = React;

var _StatusBar = {
  setNetworkActive: function(active) {
    StatusBar.setNetworkActivityIndicatorVisible(active);
  },

  setHidden: function(hidden) {
    StatusBarIOS.setHidden(hidden);
  }
};

module.exports = _StatusBar;
