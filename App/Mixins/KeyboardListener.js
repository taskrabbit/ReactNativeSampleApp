import React from 'react';

import {
  Keyboard,
} from 'react-native';


var KeyboardListener = {
  getInitialState: function() {
    return {
      keyboardSpace: 0
    };
  },

  isKeyboardVisible: function() {
    return this.state.keyboardSpace > 0;
  },

  updateKeyboardSpace: function(e) {
    if (this.isMounted() && e && e.endCoordinates) {
      this.setState({keyboardSpace: e.endCoordinates.height});
    }
  },

  resetKeyboardSpace: function() {
    if (this.isMounted()) {
      this.setState({keyboardSpace: 0});
    }
  },

  // onKeyboardHideCallback: function() {
  //   // TODO handle case when the keyboard never showed up in the first place
  //   // Might want to use state to check that it did showed up
  //   if (this.params.onKeyboardHide) {
  //     this.params.onKeyboardHide.call(this.originalComponent());
  //   }
  // },


  componentDidMount: function() {
    this._keyboardSubscriptions = [];
    this._keyboardSubscriptions.push(Keyboard.addListener('keyboardWillShow', this.updateKeyboardSpace));
    this._keyboardSubscriptions.push(Keyboard.addListener('keyboardDidShow', this.updateKeyboardSpace));
    this._keyboardSubscriptions.push(Keyboard.addListener('keyboardWillHide', this.resetKeyboardSpace));
    this._keyboardSubscriptions.push(Keyboard.addListener('keyboardDidHide', this.resetKeyboardSpace));
    //if (this.params.onKeyboardHide) {
    //  this._keyboardSubscriptions.push(Keyboard.addListener('keyboardDidHide', this.onKeyboardHideCallback));
    //}
  },

  componentWillUnmount: function() {
    this._keyboardSubscriptions.forEach((subscription) => {
      subscription.remove();
    });
  },

};

export default KeyboardListener;
