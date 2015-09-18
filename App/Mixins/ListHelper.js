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

var NavigationListener = require('../Mixins/NavigationListener');

var Loading          = require('../Screens/Loading');
var Text             = require('../Components/Text');
var SegmentedControl = require('../Components/SegmentedControl');
var SimpleList       = require('../Components/SimpleList');

var ListHelper = {
  mixins: [NavigationListener],

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

  renderItems: function() {
    return (
      <SimpleList
        {...this.props.listProps}
        style={styles.flex}
        getItemProps={this.getItemProps}
        items={this.state.items}
        reloadList={this.reloadList}
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
      <SegmentedControl currentRoute={this.props.currentRoute} {...this.props.segment} />
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
  }
});

module.exports = ListHelper;
