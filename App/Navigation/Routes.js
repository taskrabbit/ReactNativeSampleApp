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

  Dashboard: function() {
    return {
      component: require('../Screens/Dashboard/Dashboard'),
      title: 'Dashboard',
      navLeft: {
        subPath: 'settings',
        label: 'Me' // TODO: icon font
      },
      navRight: {
        subPath: 'post',
        label: '+' // TODO: icon font
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
