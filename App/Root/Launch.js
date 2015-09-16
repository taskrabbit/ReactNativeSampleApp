var React = require('react-native');

var {
  Text,
  View,
  StyleSheet
} = React;


var Launch = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>

      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

module.exports = Launch;
