import React from 'react';

import Locale from '../Locale';

import ListHelper from '../Mixins/ListHelper';

import FollowListStore from '../Stores/FollowListStore';
import FollowActions   from '../Actions/FollowActions';

var i18n = Locale.key('FollowList', {
  posts: 'Posts',
  follows: 'Follows',
});

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
            title: i18n.t('posts'),
            replacePath: 'posts'
          },
          {
            title: i18n.t('follows'),
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
        console.log(error.message);
      }
    });
  }
});

export default FollowList;
