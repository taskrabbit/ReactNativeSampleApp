import React from 'react';
import {
  View,
  StyleSheet,
  PixelRatio,
  TouchableWithoutFeedback
} from 'react-native';

import cssVar from '../Lib/cssVar';
import Locale from '../Locale';

import AppActions from '../Actions/AppActions';
import Text       from '../Components/Text';
import Button     from '../Components/Button';
import TextInput  from '../Components/TextInput';

import EnvironmentStore from '../Stores/EnvironmentStore';

var AuthHelper = {

  // parent implements: onAuthButton, getDefaultProps
  // props: authType (login, signup)

  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },

  getLinkText: function() {
    switch(this.props.authType) {
      case 'login':
        return i18n.t('login_link');
      case 'signup':
        return i18n.t('signup_link');
      default:
        return '';
    }
  },

  getLinkRoutePath: function() {
    switch(this.props.authType) {
      case 'login':
        return 'signup';
      case 'signup':
        return 'login';
      default:
        return 'signup';
    }
  },

  onLinkButton: function() {
    AppActions.launchRoutePath(this.getLinkRoutePath());
  },

  getButtonText: function() {
    switch(this.props.authType) {
      case 'login':
        return i18n.t('login_button');
      case 'signup':
        return i18n.t('signup_button');
      default:
        return '';
    }
  },

  renderPassword: function() {
    if (this.props.authType === 'login') {
      return (
        <TouchableWithoutFeedback onPress={this.launchForgotPassword}>
          <Text style={[styles.bottomText, styles.forgot]}>Forgot Password?</Text>
        </TouchableWithoutFeedback>
      );
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.flex} />
        <View style={styles.inputContainer}>
          <TextInput ref="username"
            placeholder={i18n.t('username')}
            keyboardType="default"
            style={[styles.input, styles.username]}
            enablesReturnKeyAutomatically={true}
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='next'
            onChange={(event) => this.state.username = event.nativeEvent.text }
            onSubmitEditing={() => this.refs.password.focus() }
            />
        </View>
        <View style={styles.inputContainer}>
          <TextInput ref="password"
            placeholder={i18n.t('password')}
            secureTextEntry={true}
            autoCorrect={false}
            keyboardType="default"
            style={[styles.input, styles.password]}
            enablesReturnKeyAutomatically={true}
            returnKeyType='done'
            onChange={(event) => this.state.password = event.nativeEvent.text }
            onSubmitEditing={this.onAuthButton}
          />
        </View>
        <Button type='blue' onPress={this.onAuthButton}>
          {this.getButtonText()}
        </Button>
        <View style={styles.flex} />
        <View style={styles.switch}>
          <TouchableWithoutFeedback onPress={this.onLinkButton}>
            <Text style={[styles.switchText, styles.link]}>
              {this.getLinkText()}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.flex} />
        <View style={styles.bottom}>
          {this.renderPassword()}
          <View style={styles.flex} />
          <Text style={[styles.bottomText, styles.version]}>Version {EnvironmentStore.get().displayVersion()}</Text>
        </View>
      </View>
    )
  }
};

var i18n = Locale.key('AuthHelper', {
  login_button: 'Log in',
  login_link: 'Not a user? Sign up here.',

  signup_button: 'Sign up',
  signup_link: 'Already a user? Login here.',

  username: 'Username',
  password: 'Password',
});

var styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  username: {
    marginBottom: 10
  },
  password: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: cssVar('gray20'),
    fontSize: 13,
    height: 50,
    padding: 10,
    flex: 1,
    marginHorizontal: 30
  },
  inputContainer: {
    flexDirection: 'row'
  },
  bottom: {
    flexDirection: 'row'
  },
  bottomText: {
    padding: 10,
    color: cssVar('gray20'),
  },
  forgot: {
    textAlign: 'left'
  },
  version: {
    textAlign: 'right'
  },
  switch: {
    alignItems: 'center'
  },
  switchText: {
    fontSize: 16,
  },
});

export default AuthHelper;
