import React from 'react';
import {
  AlertIOS
} from 'react-native';

var Alert = {
  alert: function(title, message, buttons, type) {
    AlertIOS.alert(title, message, buttons, type);
  }
};

module.exports = Alert;
