import 'babel-polyfill';
import 'babel-core/register';
import 'react-native-mock/mock';
import 'isomorphic-fetch';

import React from 'react';
import ReactNative from 'react-native';
// MOCKS

ReactNative.ListView = React.createClass({
  statics: {
    DataSource: () => {},
  },

  render() {
    return null;
  },
});
ReactNative.Navigator.SceneConfigs = {
  HorizontalSwipeJump: {},
};
ReactNative.NativeModules = {
  ...ReactNative.NativeModules,
};

var TextInputState = {};
var NavigatorNavigationBarStyles = {
  General: {},
};

// End MOCKS

export default function(request, parent, isMain) {
  switch (request) {
    case 'TextInputState':
      return TextInputState;
    case 'NavigatorNavigationBarStylesIOS':
      return NavigatorNavigationBarStyles;
    case 'NavigatorNavigationBarStylesAndroid':
      return NavigatorNavigationBarStyles;
    case 'ReactNativeART':
      return {};
    case 'Platform':
      return {};
    case 'ErrorUtils':
      return {};
    case 'Portal':
      return {};
    case 'React':
      return {};
    case 'parseErrorStack':
      return {};
    default:
      if (React[request]) {
        return React[request];
      }
      if (/react-native-/.test(request)) {
        return {};
      }
  }

  // other issues
  if (request.match(/.*\.png/g)) {
    return 'png';
  }

  return null;
}
