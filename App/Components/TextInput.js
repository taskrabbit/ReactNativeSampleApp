import React from 'react';

import {
  PixelRatio,
  TextInput,
  StyleSheet,
} from 'react-native';

import cssVar from '../Lib/cssVar';

var _TextInput = React.createClass({
  propTypes: TextInput.propTypes,

  focus() {
    this.refs.input.focus();
  },

  setNativeProps() {
    var input = this.refs.input;
    input.setNativeProps.apply(input, arguments);
  },

  render() {
    return (
      <TextInput
        {...this.props}
        ref="input"
        style={[styles.input, this.props.style || {}]}
      />
    );
  }
})

var styles = StyleSheet.create({
  input: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: cssVar('gray50'),
    padding: 10,
    fontFamily: cssVar('fontRegular'),
    color: cssVar('gray90'),
    fontSize: 8                           // make it small to know it's not set
  }
});

export default _TextInput;
