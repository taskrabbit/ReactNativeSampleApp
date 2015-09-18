var React = require('react-native');

var ListHelper = require('../Mixins/ListHelper');

var PostListStore = require('../Stores/PostListStore');
var PostActions   = require('../Actions/PostActions');

var PostList = React.createClass({
  mixins: [ListHelper],

  getDefaultProps: function() {
    return {
      store: PostListStore,
      listProps: {
        noTap: true
      },
      segment: {
        items: [
          {
            title: 'Posts',
            replacePath: 'posts',
            selected: true
          },
          {
            title: 'Follows',
            replacePath: 'follows'
          }
        ]
      }
    };
  },

  getListItems: function() {
    return PostListStore.get(this.props.username);
  },

  isListChange: function(username) {
    return this.props.username == username;
  },

  getItemProps: function(post) {
    return {
      title: post.data.content
    }
  },

  reloadList: function() {
    console.log("reloading posts: " + this.props.username);
    PostActions.fetchList(this.props.username, function(error) {
      // TODO: handle error
      if (error) {
        alert(error.message);
      }
    });
  }
});



module.exports = PostList;
