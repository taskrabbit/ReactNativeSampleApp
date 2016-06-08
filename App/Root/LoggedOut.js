import React from 'react';

import NavigationBar from '../Navigation/NavigationBar';

var LoggedOut = React.createClass({
  mixins: [NavigationBar],

  getDefaultProps: function() {
    return {navBarHidden: true};
  },
});

export default LoggedOut;
