var React  = require('react-native');
var {
  View,
  StyleSheet,
  TouchableOpacity
} = React;

var cssVar = require('../Lib/cssVar');

var DispatcherListener = require('../Mixins/DispatcherListener');
var AppConstants       = require('../Constants/AppConstants');
var AppActions         = require('../Actions/AppActions');

var Text = require('../Components/Text');

var NavigationButton = React.createClass({
  mixins: [DispatcherListener],

  getInitialState: function() {
    return {updatedRoute: null};
  },

  dispatchAction: function(action) {
    switch(action.actionType) {
      case AppConstants.NAVBAR_UPDATE:
        var route = this.state.updatedRoute || this.props.route;
        if (action.route.routePath === route.routePath) {
          this.setState({updatedRoute: action.route});
        }
        break;
    }
  },

  makeButton: function(item, style, callback) {
    var styleType;
    var text;

    if (item.icon) {
      styleType = styles.navBarIcon;
      text = item.icon;
    }
    else {
      styleType = styles.navBarText;
      text = item.label;
    }

    var button = (
      <View style={style}>
        <Text style={[styleType, styles.navBarButtonText, styles[text + 'NavBar'], item.disabled && styles.disabledText]}>
          {text}
        </Text>
      </View>
    );

    if (item.disabled) {
      return button;
    }
    else {
      return (
        <TouchableOpacity onPress={callback}>
          {button}
        </TouchableOpacity>
      );
    }
  },

  renderRight: function() {
    var route = this.state.updatedRoute || this.props.route;
    if (!route.navRight) return null;

    return this.makeButton(route.navRight, styles.navBarRightButton, function() {
      AppActions.launchNavItem(route, route.navRight);
    });
  },

  renderLeft: function() {
    var route = this.state.updatedRoute || this.props.route;
    if (route.navLeft && !route.navBack) {
      return this.makeButton(route.navLeft, styles.navBarLeftButton, function() {
        AppActions.launchNavItem(route, route.navLeft);
      });
    }

    if (this.props.index === 0) {
      return null;
    }

    var backLabel = route.navBack || {icon: 'back'}; //{icon: 'caret-left-semi'};
    return this.makeButton(backLabel, styles.navBarLeftButton, this.goBack);
  },

  goBack: function() {
    AppActions.goBack(this.props.navigator);
  },

  render: function() {
    switch (this.props.direction) {
      case 'left':
        return this.renderLeft();
      case 'right':
        return this.renderRight();
      default:
        throw("Unknown direction: " + this.props.direction);
    }
  }
});

var styles = StyleSheet.create({
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarIcon: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: cssVar('fontIcon'),
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: 'white',
  },
  disabledText: {
    color: cssVar('gray30')
  }
});

module.exports = NavigationButton;
