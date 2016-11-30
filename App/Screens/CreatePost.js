import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import Locale from '../Locale';

import TextInput   from '../Components/TextInput';
import Button      from '../Components/Button';
import PostActions from '../Actions/PostActions';

import KeyboardListener from '../Mixins/KeyboardListener';

import AddSpinnerLoader from '../Extensions/AddSpinnerLoader';

var CreatePost = React.createClass({
  mixins: [KeyboardListener],

  getInitialState: function() {
    return {
      content: ''
    };
  },

  onSubmitButton: function() {
    this.props['AddSpinnerLoader'].start();

    PostActions.createPost(this.state.content, function(error) {
      this.props['AddSpinnerLoader'].stop();
      if (error) {
        // TODO: better error handling
        alert(error.message);
      }
      else {
        this.props.navigation.back();
      }
    }.bind(this));
  },

  render: function() {
    return (
      <View style={styles.flex}>
        <TextInput ref="content"
          placeholder={i18n.t('placeholder')}
          keyboardType="default"
          multiline={true}
          autoFocus={true}
          style={styles.input}
          enablesReturnKeyAutomatically={true}
          returnKeyType='done'
          onChange={(event) => this.state.content = event.nativeEvent.text }
        />
        <View style={styles.footer}>
          <View style={styles.flex} />
          <Button type='blue' style={styles.button} onPress={this.onSubmitButton}>
            {i18n.t('submit')}
          </Button>
        </View>
        <View style={{height: this.state.keyboardSpace}}></View>
      </View>
    );
  }
});

var i18n = Locale.key('CreatePost', {
  placeholder: 'What do you have to say for yourself?',
  submit: 'Submit',
});

var styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'white',
    padding: 20,
    textAlignVertical: 'top'
  },
  button: {
    // width: 150
  },
  footer: {
    padding: 10,
    flexDirection: 'row'
  }
});

CreatePost = AddSpinnerLoader(CreatePost);
export default CreatePost;
