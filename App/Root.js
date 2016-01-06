var React = require('react-native');
var {
  View
} = React;

var assign = require('object-assign');

var Routes     = require('./Navigation/Routes');

var Launch     = require('./Root/Launch');
var LoggedOut  = require('./Root/LoggedOut');
var LoggedIn   = require('./Root/LoggedIn');
var Launcher   = require('./Root/Launcher');
var TestRunner = require('./Root/TestRunner');

var AppActions         = require('./Actions/AppActions');
var CurrentUserStore   = require('./Stores/CurrentUserStore');
var EnvironmentStore   = require('./Stores/EnvironmentStore');
var DebugStore         = require('./Stores/DebugStore');

var DispatcherListener = require('./Mixins/DispatcherListener');

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
  return { savedPath: DebugStore.get().currentRoutePath };
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
    this.setState(getUserState());
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

  getSavedPath: function() {
    if (!this.state.environment)                { return null; }
    if (!this.state.environment.data.simulator) { return null; }

    return this.state.savedPath;
  },

  renderContent: function() {
    if (this.state.routeUnderTest) return null;

    var routeStack = Routes.parse(this.getSavedPath(), this.state.user.isLoggedIn(), true);

    if(this.state.user.isLoggedIn()) {
      return (
        <LoggedIn
          ref="current"
          routeStack={routeStack}
        />
      );
    }
    else {
      return(<LoggedOut ref="current" routeStack={routeStack} />);
    }
  },

  render: function() {
    // need to fetch current user and environment before launching
    if (!this.state.user || !this.state.environment) {
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

module.exports = Root;
