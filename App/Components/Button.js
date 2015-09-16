// https://github.com/ide/react-native-button

var React = require('react-native');
var {
  PropTypes,
  StyleSheet,
  TouchableOpacity,
  View,
  PixelRatio
} = React;

var cssVar = require('../Lib/cssVar');

var Text = require('../Components/Text');

function coalesceNonElementChildren(children, coalesceNodes) {
  var coalescedChildren = [];

  var contiguousNonElements = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      contiguousNonElements.push(child);
      return;
    }

    if (contiguousNonElements.length) {
      var coalescedChild = coalesceNodes(contiguousNonElements, coalescedChildren.length);
      coalescedChildren.push(
        coalesceNodes(contiguousNonElements, coalescedChildren.length)
      );
      contiguousNonElements = [];
    }

    coalescedChildren.push(child);
  });

  if (contiguousNonElements.length) {
    coalescedChildren.push(
      coalesceNodes(contiguousNonElements, coalescedChildren.length)
    );
  }

  return coalescedChildren;
}

var systemButtonOpacity = 0.2;

var Button = React.createClass({
  propTypes: {
    ...TouchableOpacity.propTypes,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
  },

  render() {
    var touchableProps = {
      activeOpacity: this._computeActiveOpacity(),
    };
    if (!this.props.disabled) {
      touchableProps.onPress = this.props.onPress;
      touchableProps.onPressIn = this.props.onPressIn;
      touchableProps.onPressOut = this.props.onPressOut;
      touchableProps.onLongPress = this.props.onLongPress;
    }

    return (
      <TouchableOpacity {...touchableProps}>
        {this._renderGroupedChildren()}
      </TouchableOpacity>
    );
  },

  _renderGroupedChildren() {
    var buttonStateStyle = this.props.disabled ? styles.disabledText : null;

    var children = coalesceNonElementChildren(this.props.children, (children, index) => {
      return (
        <Text
          key={index}
          style={[styles.text, buttonStateStyle, styles.button, (styles[this.props.type] || {}), this.props.style]}>
          {children}
        </Text>
      );
    });

    switch (children.length) {
      case 0:
        return null;
      case 1:
        return children[0];
      default:
        return <View style={styles.group}>{children}</View>;
    }
  },

  _computeActiveOpacity() {
    if (this.props.disabled) {
      return 1;
    }
    return this.props.activeOpacity != null ?
      this.props.activeOpacity :
      systemButtonOpacity;
  },
});

var styles = StyleSheet.create({
  button: {
    padding: 15
  },
  blue: {
    backgroundColor: cssVar('blue50')
  },
  transparent: {
    backgroundColor: 'transparent',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'white',
  },
  icon: {
    fontFamily: cssVar('fontIcon')
  },
  text: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledText: {
    color: '#dcdcdc',
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

module.exports = Button;
