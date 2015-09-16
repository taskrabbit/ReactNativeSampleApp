var React = require('react-native');
var {
  View,
  StyleSheet
} = React;

var Text       = require('../Components/Text');
var Button     = require('../Components/Button');
var AppActions = require('../Actions/AppActions');

var Loading = React.createClass({
  onRetryButton: function() {
    AppActions.reloadCurrentPath();
  },

  renderError: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.props.error.message}
        </Text>
        <Button type='blue' onPress={this.onRetryButton} >
          Retry
        </Button>
      </View>
    );
  },

  renderLoading: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Loading
        </Text>
      </View>
    );
  },

  render: function() {
    if (this.props.error) {
      return this.renderError();
    }
    else {
      return this.renderLoading();
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

module.exports = Loading;
