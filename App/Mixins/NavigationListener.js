var NavigationListener = {
  _onDidFocusNavigation: function(event) {
    if (event.data.route.routePath === this.props.currentRoute.routePath) {
      this._hasNavigationFocus = true;
      if(this.onDidFocusNavigation) {
        this.onDidFocusNavigation();
      }
    }
  },

  _onWillFocusNavigation: function(event) {
    if(this._hasNavigationFocus) {
      this._hasNavigationFocus = false;
      if(this.onDidUnfocusNavigation) {
        this.onDidUnfocusNavigation();
      }
    }
  },

  hasNavigationFocus: function() {
    return !!this._hasNavigationFocus;
  },

  componentWillMount: function() {
    this._hasNavigationFocus = false;
    // TODO: this._onDidFocusNavigationSub  = this.props.navigator.navigationContext.addListener('didfocus',  this._onDidFocusNavigation)
    // TODO: this._onWillFocusNavigationSub = this.props.navigator.navigationContext.addListener('willfocus', this._onWillFocusNavigation)
  },

  componentWillUnmount: function() {
    if(this._onDidFocusNavigationSub) {
      this._onDidFocusNavigationSub.remove();
      this._onDidFocusNavigationSub = null;
    }
    if(this._onWillFocusNavigationSub) {
      this._onWillFocusNavigationSub.remove();
      this._onWillFocusNavigationSub = null;
    }
  }
};

export default NavigationListener;
