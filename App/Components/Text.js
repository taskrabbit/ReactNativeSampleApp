import React from 'react';

import ReactNative, {
  Text,
  StyleSheet,
} from 'react-native';

import cssVar from '../Lib/cssVar';

var _Text = React.createClass({
  propTypes: Text.propTypes,

  setNativeProps() {
    var text = this.refs.text;
    text.setNativeProps.apply(text, arguments);
  },
  render() {
    return (
      <Text
        {...this.props}
        ref="text"
        style={[styles.text, this.props.style || {}]}
      />
    );
  }
})

var styles = StyleSheet.create({
  text: {
    fontFamily: cssVar('fontRegular'),
    color: cssVar('gray90'),
    fontSize: 8                           // make it small to know it's not set
  }
});

export default _Text;
