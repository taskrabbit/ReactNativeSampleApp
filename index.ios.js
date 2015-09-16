'use strict';

var React = require('react-native');
var {
  AppRegistry
} = React;

var Root = require('./App/Root')
AppRegistry.registerComponent('Sample', () => Root);
