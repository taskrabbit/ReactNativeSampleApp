var React = require('react-native')

var {
  PixelRatio
} = React;

var cssVar = require('../Lib/cssVar');

var TextInput = React.createClass({
  propTypes: React.TextInput.propTypes,

  setNativeProps() {
    var input = this.refs.input;
    input.setNativeProps.apply(input, arguments);
  },
  render() {
    return (
      <React.TextInput
        {...this.props}
        ref="input"
        style={[styles.input, this.props.style || {}]}
      />
    );
  }
})

var styles = React.StyleSheet.create({
  input: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: cssVar('gray50'),
    padding: 10,
    fontFamily: cssVar('fontRegular'),
    color: cssVar('gray90'),
    fontSize: 8                           // make it small to know it's not set
  }
});

module.exports = TextInput;
