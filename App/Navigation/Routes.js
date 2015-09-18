var Routes = {

  LogIn: function() {
    return {
      component: require('../Screens/LogIn'),
      title: 'Log in'
    };
  },

  SignUp: function() {
    return {
      component: require('../Screens/SignUp'),
      title: 'Sign Up'
    };
  },

  PostList: function(username) {
    return {
      component: require('../Screens/PostList'),
      title: '', // set to name
      passProps: {
        username: username
      }
    };
  },

  FollowList: function(username) {
    return {
      component: require('../Screens/FollowList'),
      title: '', // set to name
      passProps: {
        username: username
      }
    };
  },

  Settings: function() {
    return {
      component: require('../Screens/Settings'),
      title: 'Settings'
    };
  },

  CreatePost: function() {
    return {
      component: require('../Screens/CreatePost'),
      title: 'New Post',
      navBack: {
        label: 'Cancel'
      }
    };
  },
};

module.exports = Routes;
