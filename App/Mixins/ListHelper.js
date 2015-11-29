// helper to handle showing lists of things
// parent must implement methods
// required: getListItem, getItemProps
// optional: isListChange, reloadList
//
// and give props
// required: store, currentRoute
// optional: listProps, segment

var React = require('react-native');
var {
  View,
  StyleSheet,
  ListView
} = React;

var cssVar = require('../Lib/cssVar');

var CurrentUserStore   = require('../Stores/CurrentUserStore');
var NavigationListener = require('../Mixins/NavigationListener');
var NavBarHelper       = require('../Mixins/NavBarHelper');

var Loading          = require('../Screens/Loading');
var Text             = require('../Components/Text');
var SegmentedControl = require('../Components/SegmentedControl');
var SimpleList       = require('../Components/SimpleList');

var AppActions = require('../Actions/AppActions');

var ListHelper = {
  mixins: [NavigationListener, NavBarHelper],

  getInitialState: function() {
    return this.getListState();
  },

  getListState: function() {
    return {
      items: this.getListItems()
    };
  },

  onListChange: function(arg) {
    if (!this.isListChange || this.isListChange(arg)) {
      this.setState(this.getListState());
    }
  },

  onDidFocusNavigation: function() {
    // items may have changed
    this.setState(this.getListState());
  },

  componentDidMount: function() {
    this.props.store.addChangeListener(this.onListChange);
    if (this.reloadList) {
      this.reloadList();
    }
  },

  componentWillUnmount: function() {
    this.props.store.removeChangeListener(this.onListChange);
  },

  getNavBarState: function() {
    var title = this.props.username ? this.props.username : "Dashboard";
    return { title: title };
  },

  getUsername: function() {
    if (!this.username) {
      this.username = this.props.username || CurrentUserStore.get().data.username;
    }
    return this.username;
  },

  getParseTitle: function() {
    if (this.props.listProps.parse === true) {
      return [
        {type: 'url', style: styles.url, onPress: (url) => AppActions.launchExternalURL(url) },
        {pattern: /@(\w+)/, style: styles.mention, onPress: (mention) => AppActions.launchRelativeItem(this.props.currentRoute, {replacePath: `follows/${mention.substring(1).toLowerCase()}/posts`}) },
        {pattern: /#(\w+)/, style: styles.hashtag},
      ]
    }

    return null;
  },

  renderItems: function() {
    return (
      <SimpleList
        style={styles.flex}
        currentRoute={this.props.currentRoute}
        getItemProps={this.getItemProps}
        items={this.state.items}
        reloadList={this.reloadList}
        parseTitle={this.getParseTitle()}
        {...this.props.listProps}
      />
    );
  },

  renderEmpty: function() {
    return(
      <Text>
        No Items
      </Text>
    );
  },

  renderHeader: function() {
    if (!this.props.segment) return null;
    return (
      <SegmentedControl currentRoute={this.props.currentRoute} appendTestId={this.getUsername()} {...this.props.segment} />
    );
  },

  renderContent: function() {
    var header = this.renderHeader();
    var content;
    if (this.state.items.length === 0) {
      content = this.renderEmpty();
    }
    else {
      content = this.renderItems();
    }

    return (
      <View style={styles.flex}>
        {header}
        {content}
      </View>
    );
  },

  render: function() {
    if (!this.state.items) {
      // TODO: load error?
      return <Loading />;
    }
    else {
      return this.renderContent();
    }
  }
};

var styles = StyleSheet.create({
  flex: {
    flex: 1
  },

  hashtag: {
    color: cssVar('blue50'),
    fontStyle: 'italic',
  },

  mention: {
    color: cssVar('blue50'),
  },

  url: {
    color: cssVar('blue50'),
    textDecorationLine: 'underline',
  }
});

module.exports = ListHelper;
