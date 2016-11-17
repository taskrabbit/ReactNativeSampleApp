import AppConstants from '../Constants/AppConstants';
import Routes       from '../Navigation/Routes';

import StatusBar    from '../Platform/StatusBar';

import {
  Linking
} from 'react-native';

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
          root.setState({navigationState: parsed});
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
      case AppConstants.TEST_COMPONENT_ROUTE:
        var TestComponents = require("../Root/TestComponents").default;
        action.routeUnderTest.component = TestComponents.find(action.routeUnderTest.component);
        rootComponent.setState({routeUnderTest: action.routeUnderTest});
        break;
      default:
        break;
    }
  }
};

export default Launcher;
