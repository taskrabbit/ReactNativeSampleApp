var Dispatcher   = require('../Dispatcher');
var AppConstants = require('../Constants/AppConstants');
var assign       = require('object-assign');

var AppActions = {
  appLaunched: function() {
    Dispatcher.dispatch({
      actionType: AppConstants.APP_LAUNCHED
    });
  },

  reloadCurrentPath: function() {
    Dispatcher.dispatch({
      actionType: AppConstants.RELOAD_PATH
    });
  },

  launchRoutePath: function(routePath) {
    console.log("Launching! " + routePath);
    Dispatcher.dispatch({
      actionType: AppConstants.LAUNCH_ROUTE_PATH,
      routePath: routePath
    });
  },

  launchExternalURL: function(url) {
    console.log("Launching! " + url);
    Dispatcher.dispatch({
      actionType: AppConstants.OPEN_URL,
      url: url
    });
  },

  launchItem: function(props) {
    if (props.actionType) {
      console.log("Action! " + props.actionType);
      Dispatcher.dispatch(props);
    }
    else if (props.routePath) {
      console.log(props.routePath);
      this.launchRoutePath(props.routePath);
    }
    else {
      console.log("Unknown launchItem");
    }
  },

  launchRelativeItem: function(currentRoute, item) {
    var navItem = assign({}, item); // clone so we can mess with it

    if(!navItem.routePath && navItem.replacePath) {
      var pieces = currentRoute.routePath.split("/");
      pieces[pieces.length-1] = navItem.replacePath;
      navItem.routePath = pieces.join('/');
    }
    if(!navItem.routePath && navItem.subPath) {
      navItem.routePath = currentRoute.routePath + "/" + navItem.subPath;
    }
    navItem.currentRoute = currentRoute;
    this.launchItem(navItem);
  },

  launchNavItem: function(currentRoute, item) {
    var navItem = assign({}, item); // clone so we can mess with it
    navItem.targetPath = currentRoute.routePath;
    this.launchRelativeItem(currentRoute, navItem);
  },

  goBack: function(navigator) {
    var current  = navigator.getCurrentRoutes();
    var previous = current[0];
    if (current.length > 2) {
      previous = current[current.length-2];
    }
    AppActions.launchRoutePath(previous.routePath);
  }
  
};

module.exports = AppActions;
