var React = require('react-native');

var NavigationBar = require('../Navigation/NavigationBar');

var LoggedOut = React.createClass({
  mixins: [NavigationBar],

  getDefaultProps: function() {
    return {navBarHidden: true};
  },
});

module.exports = LoggedOut;
