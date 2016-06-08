import Dispatcher   from '../Dispatcher';
import AppConstants from '../Constants/AppConstants';

var _httpCount = 0; // TODO: immutable?

var Network = {
  onThread: function(callback) {
    // TODO: should this be requestAnimationFrame?
    global.setTimeout(callback, 0);
  },

  started: function() {
    this.onThread(function() {
      if (_httpCount < 0) _httpCount = 0;
      _httpCount++;
      if (_httpCount == 1) {
        Dispatcher.dispatch({
          actionType: AppConstants.NETWORK_ACTIVITY,
          isActive: true
        });
      }
    });
  },
  completed: function() {
    this.onThread(function() {
      _httpCount--;
      if (_httpCount < 0) _httpCount = 0;
      if (_httpCount === 0) {
        Dispatcher.dispatch({
          actionType: AppConstants.NETWORK_ACTIVITY,
          isActive: false
        });
      }
    });
  }
};

export default Network;
