import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

import cssVar from '../Lib/cssVar';

import DispatcherListener from '../Mixins/DispatcherListener';
import AppConstants from '../Constants/AppConstants';

import AutoScaleText from '../Components/AutoScaleText';

var NavigationTitle = React.createClass({
  mixins: [DispatcherListener],

  getInitialState: function() {
    return { updatedTitle: null };
  },

  dispatchAction: function(action) {
    switch(action.actionType) {
      case AppConstants.NAVBAR_UPDATE:
        if (action.route.routePath == this.props.route.routePath) {
          this.setState({updatedTitle: action.route.title});
        }
        break;
    }
  },

  getButtonPadding() {
    const { route } = this.props;

    // for some reason 70 is the magic number for Android
    if (Platform.OS === 'android') {
      return 70;
    }
    // if navRight is a text return 70
    if (route.navRight && route.navRight.label) {
      return 70;
    }
    // if navLeft is a text return 70
    if (route.navLeft && route.navLeft.label) {
      return 70;
    }

    if (route.navBack && route.navBack.label) {
      return 70;
    }

    return 40;
  },

  render: function() {
    var title = this.state.updatedTitle || this.props.route.title;
    return (
      <AutoScaleText
        style={[styles.navBarTitleText, {width: width - this.getButtonPadding() * 2}]}
        allowFontScaling={false}
        maxFontSize={20}
        maxHeight={50}
        color='white'
      >
        {title}
      </AutoScaleText>
    );
  }
});

const marginVertical = Platform.OS === 'ios' ? 8 : 15;
var styles = StyleSheet.create({
  navBarTitleText: {
    fontFamily: cssVar('fontRegular'),
    fontWeight: '500',
    marginVertical: marginVertical,
    textAlign: 'center',
    paddingBottom: 6,
  },
});

export default NavigationTitle;
