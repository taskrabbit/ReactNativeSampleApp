var React  = require('react-native');
var {
  View,
  StyleSheet,
  TouchableHighlight
} = React;

var cssVar = require('../Lib/cssVar');

var Text       = require('../Components/Text');
var AppActions = require('../Actions/AppActions');

var SimpleListItem = React.createClass({
  onSelection: function() {
    AppActions.launchRelativeItem(this.props.currentRoute, this.props);
  },

  renderTitle: function() {
    if (!this.props.title) return null;

    return (
      <Text style={styles.title}>
        {this.props.title}
      </Text>
    );
  },

  renderSubtitle: function() {
    if (!this.props.subtitle) return null;

    return (
      <Text style={styles.subtitle}>
        {this.props.subtitle}
      </Text>
    );
  },

  renderRightIcon: function() {
    if (!this.props.nextIcon) return null;

    // caret-right-semi
    return (
      <Text style={styles.rightIcon}>
        >
      </Text>
    );
  },

  renderContent: function() {
    return (
      <View style={[styles.row, this.props.noTap && styles.touch]}>
        <View style={styles.left}>
          {this.renderTitle()}
          {this.renderSubtitle()}
        </View>
        <View style={styles.right}>
          {this.renderRightIcon()}
        </View>
      </View>
    );
  },

  render: function() {
    if (this.props.noTap) {
      return this.renderContent();
    }

    return (
      <View>
        <TouchableHighlight
              style={styles.touch}
              underlayColor={cssVar('gray10')}
              onPress={this.onSelection}
        >
          {this.renderContent()}
        </TouchableHighlight>
        <View style={cssVar('listFullLine')} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  touch: {
    backgroundColor: 'white'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding:20
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    paddingTop: 5,
    fontSize: 14,
    color: cssVar('gray20'),
  },
  left: {
    flex: 1,
  },
  right: {
    
  },
  rightIcon: {
    fontFamily: cssVar('fontIcon'),
    color: cssVar('gray30'),
    fontSize: 12,
  }
});

module.exports = SimpleListItem;
