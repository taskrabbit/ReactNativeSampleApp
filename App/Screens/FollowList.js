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
        nextIcon: true
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
    return FollowListStore.get(this.getUsername());
  },

  isListChange: function(username) {
    return this.getUsername() == username;
  },

  getItemProps: function(follow) {
    return {
      key: follow.data.id,
      title: follow.data.username,
      subPath: follow.data.username
    }
  },

  reloadList: function() {
    console.log("reloading follows: " + this.getUsername());
    FollowActions.fetchList(this.getUsername(), function(error) {
      // TODO: handle error
      if (error) {
        alert(error.message);
      }
    });
  }
});



module.exports = FollowList;
