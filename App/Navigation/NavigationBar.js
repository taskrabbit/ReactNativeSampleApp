import React from 'react';
import {
  StyleSheet,
  View,
  NavigationExperimental,
} from 'react-native';

import cssVar from '../Lib/cssVar';

import Back             from '../Platform/Back';
import NavigationHeader from '../Navigation/NavigationHeader';
import Navigator        from '../Navigation/Navigator';

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

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
          navigation={this.props.navigation}
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

  renderHeader: function(sceneProps) {
    if (this.props.navBarHidden) {
      //return <View style={{height: 0}} />
      return null;
    }

    return (
      <NavigationHeader {...sceneProps} navigation={this.navigation} />
    );

  },

  renderScene: function(sceneProps) {
    var route = sceneProps.scene.route;
    console.log('renderScene: ' + route.routePath);

    return(
      <Container 
        ref={this.onLoadedScene}
        route={route}
        navigation={this.navigation}
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

  componentWillMount: function() {
    this.navigation = new Navigator();
  },

  componentDidMount: function() {
    this.navigation.setStack(this.refs.stack);
    Back.setNavigator(this.navigation);
  },

  render: function() {
    return (
      <View style={styles.appContainer}>

        <NavigationCardStack
          ref="stack"
          navigationState={this.props.navigationState}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
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
  },
  scene: {
    flex: 1,
    backgroundColor: cssVar('gray5'),
  },
  sceneHidden: {
    marginTop: 0
  },
});


export default NavigationBar;
