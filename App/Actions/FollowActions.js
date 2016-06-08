import Dispatcher    from '../Dispatcher';
import AppConstants  from '../Constants/AppConstants';
import FollowService from '../Api/FollowService';

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

export default FollowActions;
