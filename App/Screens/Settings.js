var React  = require('react-native');
var {
  View,
  StyleSheet
} = React;

var SimpleList   = require('../Components/SimpleList');
var AppConstants = require('../Constants/AppConstants');

function getListState() {
  var list = [];
  list.push({
    title: "Log out",
    actionType: AppConstants.LOGOUT_REQUESTED
  });

  return {
    items: list
  };
};

var Settings = React.createClass({
  getInitialState() {
    return getListState();
  },

  render: function() {
    return (
      <View style={styles.container}>
        <SimpleList currentRoute={this.props.currentRoute} items={this.state.items} />
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = Settings;
