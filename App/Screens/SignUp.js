var React = require('react-native');

var AuthHelper  = require('../Mixins/AuthHelper');
var AuthActions = require('../Actions/AuthActions');

var SignUp = React.createClass({
  mixins: [AuthHelper],

  getDefaultProps: function() {
    return {
      authType: 'signup'
    };
  },

  onAuthButton: function() {
    var username = this.state.username;
    var password = this.state.password;
    AuthActions.submitSignup(username, password, function(error) {
      if (error) {
        // TODO: better errors
        alert(error.message);
      }
    });
    // TODO: setState to denote busy
  },
});

module.exports = SignUp;
