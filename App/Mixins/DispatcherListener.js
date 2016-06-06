import Dispatcher from '../Dispatcher';

var DispatcherListener = {
  unregisterDispatcher: function() {
    if(this.dispatchToken) {
      Dispatcher.unregister(this.dispatchToken);
      this.dispatchToken = null;
    }
  },

  dispatchedActionCallback: function(action) {
    if (this.isMounted()) {
      if (action.targetPath) {
        if (this.props.currentRoute && this.props.currentRoute.routePath === action.targetPath) {
          this.dispatchAction(action);
        }
      }
      else {
        this.dispatchAction(action);
      }
    }
  },

  componentDidMount: function() {
    this.unregisterDispatcher();

    var self = this;
    this.dispatchToken = Dispatcher.register(this.dispatchedActionCallback);
  },

  componentWillUnmount: function() {
    this.unregisterDispatcher();
  },
};

export default DispatcherListener;
