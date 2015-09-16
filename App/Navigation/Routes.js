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
      component: require('../Screens/Dashboard'),
      title: 'Dashboard',
      navRight: {
        subPath: 'settings',
        label: 'Me' // TODO: icon font
      }
    };
  },

  Settings: function() {
    return {
      component: require('../Screens/Settings'),
      title: 'Settings'
    };
  },
};

module.exports = Routes;
