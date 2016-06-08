import React from 'react';
import {
  StatusBar
} from 'react-native';

var _StatusBar = {
  setNetworkActive: function(active) {
    StatusBar.setNetworkActivityIndicatorVisible(active);
  },

  setHidden: function(hidden) {
    StatusBar.setHidden(hidden);
  }
};

export default _StatusBar;
