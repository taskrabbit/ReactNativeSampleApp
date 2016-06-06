// wrapper on local storage technique
import React from 'react';
import {
  AsyncStorage
} from 'react-native';

var LocalKeyStore = {
  getKey: function(keyName, callback) {
    AsyncStorage.getItem(keyName, function(error, value) { // callback: error, value
      if (error) {
        console.log('Error getting item (' + keyName + ') from local storage! ' + error.message);
        if(callback) callback(error, null);
      } else {
        var json = JSON.parse(value);
        if(callback) callback(null, json);
      }
    });
  },

  setKey: function(keyName, value, callback) { // callback: error
    if (value) {
      var encoded = JSON.stringify(value);
      AsyncStorage.setItem(keyName, encoded, function(error) {
        if (error) {
          console.log('Error setting item (' + keyName + ') to local storage! ' + error.message);
          if(callback) callback(error);
        } else {
          if(callback) callback(null);
        }
      });
    }
    else {
      // deleting it
      // TODO: what if it's not there? does it error
      AsyncStorage.removeItem(keyName, function(error) { // callback: error
        if (error) {
          console.log('Error removing item (' + keyName + ') from local storage! ' + error.message);
          if(callback) callback(error);
        } else {
          if(callback) callback(null);
        }
      });
    }
  },
};

export default LocalKeyStore;
