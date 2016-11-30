import React from 'react';
import {
  NavigationExperimental,
  StyleSheet,
} from 'react-native';

import cssVar from '../Lib/cssVar';

import NavigationTitle  from '../Navigation/NavigationTitle';
import NavigationButton from '../Navigation/NavigationButton';

const {
  Header: NavigationHeader,
} = NavigationExperimental;

var _NavigationHeader = React.createClass({
  renderTitle: function (props) {
    var route = props.scene.route;
    return <NavigationTitle route={route} />;
  },

  renderLeft: function(props) {
    var route = props.scene.route;
    var index = props.scene.index;
    return <NavigationButton route={route} index={index} navigation={this.props.navigation} direction="left" />
  },

  renderRight: function(props) {
    var route = props.scene.route;
    var index = props.scene.index;
    return <NavigationButton route={route} index={index} navigation={this.props.navigation} direction="right" />
  },

  render: function() {
    return (
      <NavigationHeader
        {...this.props}
        style={styles.header}
        renderTitleComponent={this.renderTitle}
        renderLeftComponent={this.renderLeft}
        renderRightComponent={this.renderRight}
      />
    );
  }
});

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
  header: {
    backgroundColor: cssVar('blue50'),
    borderBottomWidth: 0,
  }
});

export default _NavigationHeader;
