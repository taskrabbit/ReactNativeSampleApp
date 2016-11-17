import React from 'react';
import {
  View,
} from 'react-native';

import assign from 'object-assign';

import Routes     from './Navigation/Routes';

import Launch     from './Root/Launch';
import LoggedOut  from './Root/LoggedOut';
import LoggedIn   from './Root/LoggedIn';
import Launcher   from './Root/Launcher';
import TestRunner from './Root/TestRunner';

import AppActions         from './Actions/AppActions';
import CurrentUserStore   from './Stores/CurrentUserStore';
import EnvironmentStore   from './Stores/EnvironmentStore';
import DebugStore         from './Stores/DebugStore';

import DispatcherListener from './Mixins/DispatcherListener';

function getUserState() {
  return {
    user: CurrentUserStore.get()
  };
};

function getEnvironmentState() {
  return {
    environment: EnvironmentStore.get()
  };
};

function getDebugState() {
  return {
    debug: DebugStore.get()
  };
}

var Root = React.createClass({
  mixins: [DispatcherListener],

  getInitialState: function() {
    return assign({},
                getUserState(),
                getEnvironmentState(),
                getDebugState()
    );
  },

  onUserChange: function() {
    var state = getUserState();
    // reset the route stack on user change.
    state.navigationState = null;
    this.setState(state);
  },

  onEnvChange: function() {
    this.setState(getEnvironmentState());
  },

  onDebugChange: function() {
    this.setState(getDebugState());
  },

  dispatchAction: function(action) {
    Launcher.launch(this, action);
  },

  componentDidMount: function() {
    CurrentUserStore.addChangeListener(this.onUserChange);
    EnvironmentStore.addChangeListener(this.onEnvChange);
    DebugStore.addChangeListener(this.onDebugChange);
    AppActions.appLaunched();
  },

  componentWillUnmount: function() {
    DebugStore.removeChangeListener(this.onDebugChange);
    EnvironmentStore.removeChangeListener(this.onEnvChange);
    CurrentUserStore.removeChangeListener(this.onUserChange);
  },

  getSavedCurrentRoutePath: function() {
    if (!this.state.environment.data.simulator)      { return null; }
    if (this.state.environment.data.name === 'test') { return null; }

    return this.state.debug.currentRoutePath;
  },

  getDefaultNavigationState: function() {
    return Routes.parse(null, this.state.user.isLoggedIn(), true);
  },

  renderContent: function() {
    if (this.state.routeUnderTest) return null;

    var navigationState = this.state.navigationState;
    if (!navigationState && this.getSavedCurrentRoutePath()) {
      navigationState = Routes.parse(this.getSavedCurrentRoutePath(), this.state.user.isLoggedIn(), true);
    }
    if (!navigationState) {
      navigationState = this.getDefaultNavigationState();
    }

    if(this.state.user.isLoggedIn()) {
      return (
        <LoggedIn
          ref="current"
          navigationState={navigationState}
        />
      );
    }
    else {
      return(<LoggedOut ref="current" navigationState={navigationState} />);
    }
  },

  render: function() {
    // need to fetch current user and environment before launching
    if (!this.state.user || !this.state.environment || !this.state.debug) {
      return(<Launch ref="current" />);
    }
    else if (this.state.environment.data.name === 'test') {
      return (
        <View style={{flex:1}}>
          <TestRunner routeUnderTest={this.state.routeUnderTest}/>
          {this.renderContent()}
        </View>
      );
    }
    else {
      return this.renderContent();
    }
  }
});

export default Root;
