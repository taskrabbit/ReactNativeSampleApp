import React from 'react';

import cssVar from '../Lib/cssVar';

import Text             from '../Components/Text';
import AppActions       from '../Actions/AppActions';
import NavigationTitle  from '../Navigation/NavigationTitle';
import NavigationButton from '../Navigation/NavigationButton';

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
