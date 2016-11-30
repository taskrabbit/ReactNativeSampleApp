import React from 'react';
import {
  NavigationExperimental,
} from 'react-native';

import AppActions from '../Actions/AppActions';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

var Navigator = function() {
  this.stack = null;
};

Navigator.prototype.setStack = function(stack) {
  this.stack = stack;
};

Navigator.prototype.back = function() {
  if (!this.stack) return false;

  var state = this.stack.props.navigationState;
  var index = state.index;
  if (index === 0) return false;

  var updated = NavigationStateUtils.pop(state);
  var routes = updated.routes;
  if(routes.length === 0) return false;

  var previous = routes[routes.length-1];
  AppActions.launchRoutePath(previous.routePath);
};

export default Navigator;
