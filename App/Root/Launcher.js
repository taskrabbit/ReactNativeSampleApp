var AppConstants = require('../Constants/AppConstants');
var Routes       = require('../Navigation/Routes');

var StatusBar    = require('../Platform/StatusBar');
var Linking      = require('../Platform/Linking');

var Launcher = {
  launch: function(root, action) {
    switch(action.actionType) {
      case AppConstants.LAUNCH_ROUTE_PATH:
        var routePath = action.routePath;
        var loggedIn = root.state && root.state.user.isLoggedIn();
        var parsed = Routes.parse(routePath, loggedIn, false);
        if (!parsed) {
          alert("Unknown route: " + routePath);
        }
        else {
          root.setState({routeStack: parsed});
        }
        break;
      case AppConstants.NETWORK_ACTIVITY:
        StatusBar.setNetworkActive(action.isActive);
        break;
      case AppConstants.OPEN_URL:
        var url = action.url;
        Linking.openURL(url)
        break;
      case AppConstants.RELOAD_PATH:
        // TODO
        //root.setState({loading: true}, function() {
        //  root.setState({loading: false});
        //});
        break;
      default:
        break;
    }
  }
};

module.exports = Launcher;
