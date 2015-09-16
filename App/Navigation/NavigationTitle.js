var React  = require('react-native');
var {
  View,
  StyleSheet
} = React;

var cssVar = require('../Lib/cssVar');

var DispatcherListener = require('../Mixins/DispatcherListener');
var AppConstants = require('../Constants/AppConstants');

var Text = require('../Components/Text');

var NavigationTitle = React.createClass({
  mixins: [DispatcherListener],

  getInitialState: function() {
    return { updatedTitle: null };
  },

  dispatchAction: function(action) {
    switch(action.actionType) {
      case AppConstants.NAVBAR_UPDATE:
        if (action.route.routePath == this.props.route.routePath) {
          this.setState({updatedTitle: action.route.title});
        }
        break;
    }
  },

  render: function() {
    var title = this.state.updatedTitle || this.props.route.title;
    return (
      <Text style={styles.navBarTitleText}>
        {title}
      </Text>
    );
  }
});

var styles = StyleSheet.create({
  navBarTitleText: {
    fontSize: 20,
    fontFamily: cssVar('fontRegular'),
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  }
});

module.exports = NavigationTitle;
