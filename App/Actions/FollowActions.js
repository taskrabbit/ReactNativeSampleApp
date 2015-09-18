var Dispatcher    = require('../Dispatcher');
var AppConstants  = require('../Constants/AppConstants');
var FollowService = require('../Api/FollowService');

var FollowActions = {

  fetchList: function(username, callback) {
    FollowService.fetchList(username, function(error, listProps) {
      if(callback) callback(error);

      if (!error) {
        Dispatcher.dispatch({
          actionType: AppConstants.FOLLOW_LIST_UPDATED,
          listProps: listProps
        });
      }
    });
  }
};

module.exports = FollowActions;
