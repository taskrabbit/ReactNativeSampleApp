import React from 'react';

import {
  PixelRatio,
  StyleSheet,
  TextInput,
} from 'react-native';

import cssVar from '../Lib/cssVar';

class _TextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  setNativeProps(...args) {
    this.refs.input.setNativeProps(...args);
  }

  blur() {
    this.refs.input.blur();
  }

  focus() {
    this.refs.input.focus();
  }

  render() {
    return (
      <TextInput
        ref='input'
        {...this.props}
        style={[styles.input, this.props.style]}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: cssVar('gray50'),
    padding: 10,
    fontFamily: cssVar('fontRegular'),
    color: cssVar('gray90'),
    fontSize: 8, // make it small to know it's not set
  },
});

export default _TextInput;
