var Dispatcher   = require('../Dispatcher');
var AppConstants = require('../Constants/AppConstants');
var PostService  = require('../Api/PostService');

var PostActions = {

  fetchList: function(username, callback) {
    PostService.fetchList(username, function(error, listProps) {
      if(callback) callback(error);

      if (!error) {
        Dispatcher.dispatch({
          actionType: AppConstants.POST_LIST_UPDATED,
          listProps: listProps
        });
      }
    });
  },

  createPost: function(content, callback) {
    PostService.createPost(content, function(error, postProps) {
      if(callback) callback(error);

      if (!error) {
        Dispatcher.dispatch({
          actionType: AppConstants.POST_ADDED,
          postProps: postProps
        });
      }
    });
  }
};

module.exports = PostActions;
