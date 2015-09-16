var React = require('react-native');
var {
  View,
  StyleSheet,
  ListView
} = React;

var RefreshableListView = require('react-native-refreshable-listview');

var NavigationListener = require('../../Mixins/NavigationListener');
var PostListItem       = require('../../Screens/Dashboard/PostListItem');
var Loading            = require('../../Screens/Loading');
var Text               = require('../../Components/Text');

var PostListStore = require('../../Stores/PostListStore');
var PostActions   = require('../../Actions/PostActions');

var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects

var PostList = React.createClass({
  mixins: [NavigationListener],

  getInitialState: function() {
    return this.getListState();
  },

  getListState: function() {
    var items = PostListStore.get(this.props.username);
    if (!items) {
      return {
        dataSource: null
      };
    }
    else {
      return {
        dataSource: dataSource.cloneWithRows(items)
      };
    }
  },

  onListChange: function(username) {
    if (this.props.username == username) {
      this.setState(this.getListState());
    }
  },

  onDidFocusNavigation: function() {
    // posts may have changed
    this.setState(this.getListState());
  },

  componentDidMount: function() {
    PostListStore.addChangeListener(this.onListChange);
    this.reloadPosts();
  },

  componentWillUnmount: function() {
    PostListStore.removeChangeListener(this.onListChange);
  },

  reloadPosts: function() {
    console.log("reloading posts: " + this.props.username);
    PostActions.fetchList(this.props.username, function(error) {
      // TODO: handle error
      if (error) {
        alert(error.message);
      }
    });
  },

  renderRow: function(post, sectionId, rowId) {
    return (
      <PostListItem post={post} key={"post" + post.data.id} />
    );
  },

  renderPosts: function() {
    return (
      <RefreshableListView
        style={styles.flex}
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        loadData={this.reloadPosts}
        // refreshDescription={"Refresh"}
      />
    );
  },

  renderContent: function() {
    if (!this.state.dataSource) {
      // TODO: load error?
      return <Loading />;
    }
    else if (this.state.dataSource.getRowCount() === 0) {
      return this.renderEmpty();
    }
    else {
      return this.renderPosts();
    }
  },

  renderEmpty: function() {
    return(
      <Text>
        No Posts
      </Text>
    );
  },

  render: function() {
    return (
      <View style={styles.flex}>
        {this.renderContent()}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  flex: {
    flex: 1
  }
});

module.exports = PostList;
