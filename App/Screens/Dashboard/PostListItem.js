var React  = require('react-native');
var {
  View,
  StyleSheet,
  TouchableHighlight
} = React;

var cssVar = require('../../Lib/cssVar');

var Text       = require('../../Components/Text');

var PostListItem = React.createClass({
  render: function() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.content}>
            {this.props.post.data.content}
          </Text>
        </View>
        <View style={cssVar('listFullLine')} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    padding: 25
  },
  content: {
    fontSize: 16,
  }
});

module.exports = PostListItem;
