import React from 'react';
import NavigationBar from '../Navigation/NavigationBar';

var LoggedIn = React.createClass({
  mixins: [NavigationBar],

  getDefaultProps: function() {
    return {};
  },
});

export default LoggedIn;
