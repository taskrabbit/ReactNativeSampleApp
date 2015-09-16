var AppConstants = require('../Constants/AppConstants');
var Router       = require('../Navigation/Router');

var Launcher = {
  launch: function(root, action) {
    switch(action.actionType) {
      case AppConstants.LAUNCH_ROUTE_PATH:
        var routePath = action.routePath;
        var loggedIn = root.state && root.state.user.isLoggedIn();
        var parsed = Router.parse(routePath, loggedIn, false);
        if (!parsed) {
          alert("Unknown route: " + routePath);
        }
        else {
          root.setState({routeStack: parsed});
        }
        break;
      default:
        break;
    }
  }
};

module.exports = Launcher;
