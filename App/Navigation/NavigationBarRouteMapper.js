var React = require('react-native');

var cssVar = require('../Lib/cssVar');

var Text             = require('../Components/Text');
var AppActions       = require('../Actions/AppActions');
var NavigationTitle  = require('../Navigation/NavigationTitle');
var NavigationButton = require('../Navigation/NavigationButton');

// Nav sample: https://github.com/facebook/react-native/blob/2b916f3ceffbcb11ed383f958823d221b3feacc6/Examples/UIExplorer/Navigator/NavigationBarSample.js
class NavigationBarRouteMapper {
  constructor() {
  }

  LeftButton(route, navigator, index, navState) {
    return (<NavigationButton route={route} index={index} navigator={navigator} direction="left" />);
  }

  RightButton(route, navigator, index, navState) {
    return (<NavigationButton route={route} index={index} navigator={navigator} direction="right" />);
  }

  Title(route, navigator, index, navState) {
    return (<NavigationTitle route={route} />);
  }

}

module.exports = NavigationBarRouteMapper;
