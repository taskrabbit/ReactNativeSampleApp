import Dispatcher   from '../Dispatcher';
import AppConstants from '../Constants/AppConstants';
import AuthService  from '../Api/AuthService';

var AuthActions = {
  authCallback: function(callback) {
    return function(error, data) {
      if(callback) callback(error);

      if (!error) {
        Dispatcher.dispatch({
          actionType: AppConstants.LOGIN_USER,
          userProps: data.userProps,
          token: data.token
        });
      }
    };
  },

  submitLogin: function(username, password, callback) {
    AuthService.login(username, password, this.authCallback(callback));
  },

  submitSignup: function(username, password, callback) {
    AuthService.signup(username, password, this.authCallback(callback));
  }
};

export default AuthActions;
