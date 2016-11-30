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
      <View style={styles.title}>
        <AutoScaleText
          style={styles.titleText}
          allowFontScaling={false}
          maxFontSize={18}
          maxHeight={50}
        >
          {title}
        </AutoScaleText>
      </View>
    );
  }
});

const marginVertical = Platform.OS === 'ios' ? 8 : 15;
var styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16
  },

  titleText: {
    color: 'white',
    fontFamily: cssVar('fontRegular'),
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    //textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    paddingBottom: 6,
  }
});

export default NavigationTitle;
