var React = require('react-native');

var ListHelper = require('../Mixins/ListHelper');

var FollowListStore = require('../Stores/FollowListStore');
var FollowActions   = require('../Actions/FollowActions');

var FollowList = React.createClass({
  mixins: [ListHelper],

  getDefaultProps: function() {
    return {
      store: FollowListStore,
      listProps: {
        noTap: true
      },
      segment: {
        items: [
          {
            title: 'Posts',
            replacePath: 'posts'
          },
          {
            title: 'Follows',
            replacePath: 'follows',
            selected: true
          }
        ]
      }
    };
  },

  getListItems: function() {
    return FollowListStore.get(this.props.username);
  },

  isListChange: function(username) {
    return this.props.username == username;
  },

  getItemProps: function(follow) {
    return {
      title: follow.data.username
    }
  },

  reloadList: function() {
    console.log("reloading follows: " + this.props.username);
    FollowActions.fetchList(this.props.username, function(error) {
      // TODO: handle error
      if (error) {
        alert(error.message);
      }
    });
  }
});



module.exports = FollowList;
