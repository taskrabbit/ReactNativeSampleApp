import React from 'react';
import {
  StatusBar,
  StatusBarIOS
} from 'react-native';

var _StatusBar = {
  setNetworkActive: function(active) {
    StatusBar.setNetworkActivityIndicatorVisible(active);
  },

  setHidden: function(hidden) {
    StatusBarIOS.setHidden(hidden);
  }
};

export default _StatusBar;
