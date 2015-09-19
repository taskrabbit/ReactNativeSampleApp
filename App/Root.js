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

var AppActions         = require('./Actions/AppActions');
var CurrentUserStore   = require('./Stores/CurrentUserStore');
var EnvironmentStore   = require('./Stores/EnvironmentStore');
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

var Root = React.createClass({
  mixins: [DispatcherListener],

  getInitialState: function() {
    return assign({},
                getUserState(),
                getEnvironmentState()
    );
  },

  onUserChange: function() {
    var state = getUserState();
    state.routeStack = Routes.parse(null, state.user.isLoggedIn(), true);
    this.setState(state);
  },

  onEnvChange: function() {
    this.setState(getEnvironmentState());
  },

  dispatchAction: function(action) {
    Launcher.launch(this, action);
  },

  componentDidMount: function() {
    CurrentUserStore.addChangeListener(this.onUserChange);
    EnvironmentStore.addChangeListener(this.onEnvChange);
    AppActions.appLaunched();
  },

  componentWillUnmount: function() {
    EnvironmentStore.removeChangeListener(this.onEnvChange);
    CurrentUserStore.removeChangeListener(this.onUserChange);
  },

  renderContent: function() {
    var routeStack = this.state.routeStack;
    if(this.state.user.isLoggedIn()) {
      return(<LoggedIn ref="current" routeStack={routeStack} />);
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
    else {
      return this.renderContent();
    }
  }
});

module.exports = Root;
