// parent must implement getNavBarState()

import TimerMixin from 'react-timer-mixin';

import Dispatcher   from '../Dispatcher';
import AppConstants from '../Constants/AppConstants';

var NavBarHelper = {
  mixins: [TimerMixin],

  componentDidMount: function() {
    this.updateNavTitle();
  },
  
  componentDidUpdate: function() {
    this.updateNavTitle();
  },

  updateNavTitle: function() {
    var updates = this.getNavBarState();
    if (!updates) return;

    if(typeof updates.title !== "undefined") {
      this.props.currentRoute.title = updates.title;
    }
    if (typeof updates.navRightDisabled !== "undefined") {
      this.props.currentRoute.navRight.disabled = updates.navRightDisabled;
    }
    if (typeof updates.navRightIcon !== "undefined") {
      this.props.currentRoute.navRight.icon = updates.navRightIcon;
    }
    
    // if called during componentDidLoad, nav bar not loaded yet
    // requestAnimationFrame to allow it to finish
    var route = this.props.currentRoute;
    this.requestAnimationFrame(function() {
      Dispatcher.dispatch({
        actionType: AppConstants.NAVBAR_UPDATE,
        route: route
      });
    });
  },
};

export default NavBarHelper;
