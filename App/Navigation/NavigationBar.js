var React = require('react-native');
var {
  Navigator,
  StyleSheet,
  TouchableOpacity,
  View,
} = React;

var cssVar = require('../Lib/cssVar');

var NavigatorNavigationBarStyles = require('NavigatorNavigationBarStyles');
var NavigationBarRouteMapper     = require('../Navigation/NavigationBarRouteMapper');

var stacksEqual = function(one, two, length) {
  if (one.length < length) return false;
  if (two.length < length) return false;

  for (var i=0; i < length; i++) {
    if (one[i].routePath !== two[i].routePath) {
      return false;
    }
  }
  return true;
};

var Container = React.createClass({
  render: function() {
    var Component = this.props.route.component;
    return (
      <View 
        style={[styles.scene, this.props.navBarHidden && styles.sceneHidden]}
        ref={this.props.onLoadedScene}
      >
        <Component ref="mainComponent"
          navigator={this.props.navigator}
          currentRoute={this.props.route}
          {...this.props.route.passProps}
        />
      </View>
    );
  }
});

var NavigationBar = {
  getInitialState: function() {
    return {};
  },

  renderScene: function(route, navigator) {
    console.log('renderScene: ' + route.routePath);

    return(
      <Container 
        ref={this.onLoadedScene}
        route={route}
        navigator={navigator}
        {...this.props}
      />
    );
  },

  onLoadedScene: function(component) {
    console.log("onLoadedScene");
    if (component) {
      this._currentComponent = component.refs.mainComponent;
    }
    else {
      this._currentComponent = null;
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    var current = this.refs.navigator.getCurrentRoutes();
    
    if (!current) return; // otherwise initial

    var next = this.props.routeStack.path;
    var currentRoute = current[current.length - 1];
    var currentPath  = currentRoute.routePath;
    var nextRoute    = next[next.length - 1];
    var nextPath     = nextRoute.routePath;

    if(stacksEqual(current, next, current.length)
          && next[next.length-2]
          && next[next.length-2].routePath === currentPath) {
      // simple push
      this.refs.navigator.push(nextRoute);
    }
    else if(stacksEqual(current, next, next.length)
          && current[current.length-2]
          && current[current.length-2].routePath === nextPath) {
      // simple pop
      this.refs.navigator.pop();
    }
    else if(stacksEqual(current, next, next.length-1)) {
      // switching out last one
      if (currentRoute.component === nextRoute.component
          && this._currentComponent
          && this._currentComponent.setNavigatorRoute) {
        // switch out current one, same type
        if (this._currentComponent.props.currentRoute) {
          // update it in place
          this._currentComponent.props.currentRoute = currentRoute;
        }
        this._currentComponent.setNavigatorRoute(nextRoute);
      }
      else {
        this.refs.navigator.replace(nextRoute);
      }
    }
    else {
      // something more complicated
      this.refs.navigator.immediatelyResetRouteStack(this.props.routeStack.path);
    }
  },

  renderNavBar: function() {
    if (this.props.navBarHidden) return null;

    return (
      <Navigator.NavigationBar
        routeMapper={new NavigationBarRouteMapper()}
        style={styles.navBar}
      />
    );
  },

  render: function() {
    return (
      <View style={styles.appContainer}>
        <Navigator
          ref="navigator"
          debugOverlay={false}
          renderScene={this.renderScene}
          navBarHidden={this.props.navBarHidden}
          initialRouteStack={this.props.routeStack.path}
          navigationBar={this.renderNavBar()}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  navBar: {
    backgroundColor: cssVar('blue50'),
    height: NavigatorNavigationBarStyles.General.TotalNavHeight
  },
  scene: {
    flex: 1,
    marginTop: NavigatorNavigationBarStyles.General.TotalNavHeight,
    backgroundColor: cssVar('gray5'),
  },
  sceneHidden: {
    marginTop: 0
  }
});


module.exports = NavigationBar;
