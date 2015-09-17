var React = require('react-native');
var {
  View,
  StyleSheet
} = React;

var TextInput   = require('../Components/TextInput');
var Button      = require('../Components/Button');
var PostActions = require('../Actions/PostActions');
var AppActions  = require('../Actions/AppActions');

var KeyboardListener = require('../Mixins/KeyboardListener');

var CreatePost = React.createClass({
  mixins: [KeyboardListener],

  getInitialState: function() {
    return {
      content: ''
    };
  },

  onSubmitButton: function() {
    PostActions.createPost(this.state.content, function(error) {
      if (error) {
        // TODO: better error handling
        alert(error.message);
      }
      else {
        AppActions.goBack(this.props.navigator);
      }
    }.bind(this));
  },

  render: function() {
    return (
      <View style={styles.flex}>
        <TextInput ref="content"
          placeholder={"What do you have to say for yourself?"}
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
            Submit
          </Button>
        </View>
        <View style={{height: this.state.keyboardSpace}}></View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'white',
    padding: 20
  },
  button: {
    // width: 150
  },
  footer: {
    padding: 10,
    flexDirection: 'row'
  }
});

module.exports = CreatePost;
