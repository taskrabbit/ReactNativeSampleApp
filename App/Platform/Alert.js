var React = require('react-native');
var {
  AlertIOS
} = React;

var Alert = {
  alert: function(title, message, buttons, type) {
    AlertIOS.alert(title, message, buttons, type);
  }
};

module.exports = Alert;
