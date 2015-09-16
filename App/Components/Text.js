var React = require('react-native')

var cssVar = require('../Lib/cssVar');

var Text = React.createClass({
  propTypes: React.Text.propTypes,

  setNativeProps() {
    var text = this.refs.text;
    text.setNativeProps.apply(text, arguments);
  },
  render() {
    return (
      <React.Text
        {...this.props}
        ref="text"
        style={[styles.text, this.props.style || {}]}
      />
    );
  }
})

var styles = React.StyleSheet.create({
  text: {
    fontFamily: cssVar('fontRegular'),
    color: cssVar('gray90'),
    fontSize: 8                           // make it small to know it's not set
  }
});

module.exports = Text;
