var Dispatcher   = require('../Dispatcher');
var AppConstants = require('../Constants/AppConstants');
var AuthService  = require('../Api/AuthService');

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

module.exports = AuthActions;
