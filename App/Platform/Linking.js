import React from 'react';
import {
  LinkingIOS
} from 'react-native';

var Linking = {
  openURL: function(url) {
    console.log("Linking.openURL: " + url);
    LinkingIOS.openURL(url);
  }
};

module.exports = Linking;
