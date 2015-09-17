var React = require('react-native');
var KeyboardEvents = require('react-native-keyboardevents');
var KeyboardEventEmitter = KeyboardEvents.Emitter;

var KeyboardListener = {
  getInitialState: function() {
    return {
      keyboardSpace: 0
    };
  },

  isKeyboardVisible: function() {
    return this.state.keyboardSpace > 0;
  },

  updateKeyboardSpace: function(frames) {
    if (this.isMounted() && frames && frames.end) {
      this.setState({keyboardSpace: frames.end.height});
    }
  },

  resetKeyboardSpace: function() {
    if (this.isMounted()) {
      this.setState({keyboardSpace: 0});
    }
  },

  componentDidMount: function() {
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
  },

  componentWillUnmount: function() {
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
  },
};

module.exports = KeyboardListener;
