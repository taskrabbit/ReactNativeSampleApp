var React = require('react-native');
var {
  View,
  StyleSheet
} = React;

var PostList = require ('../Screens/PostList');

var CurrentUserStore = require('../Stores/CurrentUserStore');

var Dashboard = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <PostList
          username={CurrentUserStore.get().data.username}
          currentRoute={this.props.currentRoute}
          navigator={this.props.navigator}
        />
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = Dashboard;
