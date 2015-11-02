var React = require('react-native');
var {
  View,
  StyleSheet,
  PixelRatio,
  TouchableWithoutFeedback
} = React;

var cssVar = require('../Lib/cssVar');

var AppActions = require('../Actions/AppActions');
var Text       = require('../Components/Text');
var Button     = require('../Components/Button');
var TextInput  = require('../Components/TextInput');

var EnvironmentStore = require('../Stores/EnvironmentStore');

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
        return 'Not a user? Sign up here.';
      case 'signup':
        return 'Already a user? Login here.';
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
        return 'Log in';
      case 'signup':
        return 'Sign up';
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
        <TextInput ref="username"
          placeholder={"Username"}
          keyboardType="default"
          style={[styles.input, styles.username]}
          enablesReturnKeyAutomatically={true}
          returnKeyType='next'
          onChange={(event) => this.state.username = event.nativeEvent.text }
          onSubmitEditing={() => this.refs.password.focus() }
          />
        <TextInput ref="password"
          placeholder={'Password'}
          password={true}
          autoCorrect={false}
          keyboardType="default"
          style={[styles.input, styles.password]}
          enablesReturnKeyAutomatically={true}
          returnKeyType='done'
          onChange={(event) => this.state.password = event.nativeEvent.text }
          onSubmitEditing={this.onAuthButton}
        />
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
    marginHorizontal: 30
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

module.exports = AuthHelper;
