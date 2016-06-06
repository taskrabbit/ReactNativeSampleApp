import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import cssVar from '../Lib/cssVar';

import DispatcherListener from '../Mixins/DispatcherListener';
import AppConstants from '../Constants/AppConstants';

import Text from '../Components/Text';

var NavigationTitle = React.createClass({
  mixins: [DispatcherListener],

  getInitialState: function() {
    return { updatedTitle: null };
  },

  dispatchAction: function(action) {
    switch(action.actionType) {
      case AppConstants.NAVBAR_UPDATE:
        if (action.route.routePath == this.props.route.routePath) {
          this.setState({updatedTitle: action.route.title});
        }
        break;
    }
  },

  render: function() {
    var title = this.state.updatedTitle || this.props.route.title;
    return (
      <Text style={styles.navBarTitleText}>
        {title}
      </Text>
    );
  }
});

var styles = StyleSheet.create({
  navBarTitleText: {
    fontSize: 20,
    fontFamily: cssVar('fontRegular'),
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  }
});

module.exports = NavigationTitle;
