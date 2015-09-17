var React = require('react-native');
var {
  LinkingIOS
} = React;

var Linking = {
  openURL: function(url) {
    console.log("Linking.openURL: " + url);
    LinkingIOS.openURL(url);
  }
};

module.exports = Linking;
