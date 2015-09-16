var React = require('react-native');
var NavigationBar = require('../Navigation/NavigationBar');

var LoggedIn = React.createClass({
  mixins: [NavigationBar],

  getDefaultProps: function() {
    return {};
  },
});

module.exports = LoggedIn;
