import React from 'react';

import Locale from '../Locale';

import ListHelper from '../Mixins/ListHelper';

import PostListStore from '../Stores/PostListStore';
import PostActions   from '../Actions/PostActions';

var i18n = Locale.key('PostList', {
  posts: 'Posts',
  follows: 'Follows',
});

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
            title: i18n.t('posts'),
            replacePath: 'posts',
            selected: true
          },
          {
            title: i18n.t('follows'),
            replacePath: 'follows'
          }
        ]
      }
    };
  },

  getListItems: function() {
    return PostListStore.get(this.getUsername());
  },

  isListChange: function(username) {
    return this.getUsername() == username;
  },

  getItemProps: function(post) {
    return {
      key: post.data.id,
      title: post.data.content
    }
  },

  reloadList: function() {
    console.log("reloading posts: " + this.getUsername());
    PostActions.fetchList(this.getUsername(), function(error) {
      // TODO: handle error
      if (error) {
        console.log(error.message);
      }
    });
  }
});



export default PostList;
