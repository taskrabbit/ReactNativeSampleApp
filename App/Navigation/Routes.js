import Router from '../Navigation/Router';

import Locale from '../Locale';

var i18n = Locale.key('Routes', {
  login: 'Log in',
  signup: 'Sign Up',
  settings: 'Settings',
  new_post: 'New Post',
  cancel: 'Cancel',
  account: 'Me'
});

var Routes = {

  LogIn: function() {
    return {
      component: require('../Screens/LogIn').default,
      title: i18n.t('login')
    };
  },

  SignUp: function() {
    return {
      component: require('../Screens/SignUp').default,
      title: i18n.t('signup')
    };
  },

  PostList: function(username) {
    return {
      component: require('../Screens/PostList').default,
      title: '', // set to name
      passProps: {
        username: username
      }
    };
  },

  FollowList: function(username) {
    return {
      component: require('../Screens/FollowList').default,
      title: '', // set to name
      passProps: {
        username: username
      }
    };
  },

  Settings: function() {
    return {
      component: require('../Screens/Settings').default,
      title: i18n.t('settings')
    };
  },

  CreatePost: function() {
    return {
      component: require('../Screens/CreatePost').default,
      title: i18n.t('new_post'),
      navBack: {
        label: i18n.t('cancel')
      }
    };
  },
};


var listRoute = function(route, defaultRoute) {
  var username = route.passProps ? route.passProps.username : null;
  route.parse = function(path) {
    switch(path) {
      case '_post':
        return Routes.CreatePost();
      case '_settings':
        // only on 'Dashboard'
        if(username) return null;
        return Routes.Settings();
      default:
        if (!defaultRoute) return null;
        return defaultRoute(path);
    }
  }

  if(!route.navRight) {
    route.navRight = {
      subPath: '_post',
      label: '+' // TODO: icon font
    };
  }

  if(!route.navLeft && !username) {
    route.navLeft = {
      subPath: '_settings',
      label: i18n.t('account') // TODO: icon font
    };
  }
  return route;
};

var userRoute = function(username) {
  var route = {}
  route._notAddressable = true;
  route._routerAppend = 'posts';

  route.parse = function(path) {
    switch(path) {
      case 'posts':
        return listRoute(Routes.PostList(username), function(postId) {
          // TOOD: show post
          return null;
        });
      case 'follows':
        return listRoute(Routes.FollowList(username), function(follow) {
          // it's a user
          return userRoute(follow);
        });
      default:
        return null;
    };
  };
  return route;
};

var LoggedIn = {
  parse: function(host) {
    switch (host) {
      case 'dashboard':        
        return userRoute(null);
      default:
        return null;
    }
  }
};

var LoggedOut = {
  parse: function(host) {
    switch (host) {
      case 'signup':
        return Routes.SignUp();
      case 'login':
        return Routes.LogIn();
      default:
        return null;
    }
  }
};

export default {
  parse: function(str, loggedIn, defaulted) {
    var parent = loggedIn ? LoggedIn : LoggedOut;
    var found = Router.parse(str, parent, defaulted);
    if (!found && defaulted) {
      if (loggedIn) {
        found = this.parse('dashboard', true, false);
      }
      else {
        found = this.parse('signup', false, false);
      }
    }
    return found;
  }
};
