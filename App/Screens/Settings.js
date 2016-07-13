import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import cssVar from '../Lib/cssVar';
import Locale from '../Locale';

import SimpleList   from '../Components/SimpleList';
import AppConstants from '../Constants/AppConstants';

import EnvironmentStore from '../Stores/EnvironmentStore';

var i18n = Locale.key('Settings', {
  logout: 'Log out',
});

function getListState() {
  var list = [];
  list.push({
    title: i18n.t('logout'),
    actionType: AppConstants.LOGOUT_REQUESTED
  });

  return {
    items: list
  };
};

var Settings = React.createClass({
  getInitialState() {
    return getListState();
  },

  render: function() {
    return (
      <View style={styles.container}>
        <SimpleList currentRoute={this.props.currentRoute} items={this.state.items} />
        <View style={styles.bottom}>
          <Text style={styles.bottomText}>Version {EnvironmentStore.get().displayVersion()}</Text>
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomText: {
    padding: 10,
    color: cssVar('gray20'),
    fontSize: 12
  },
});

export default Settings;
