// helper to handle showing lists of things
// parent must implement methods
// required: getListItem, getItemProps
// optional: isListChange, reloadList
//
// and give props
// required: store, currentRoute
// optional: listProps, segment

import React from 'react';
import {
  View,
  StyleSheet,
  ListView
} from 'react-native';

import Locale from '../Locale';

import CurrentUserStore   from '../Stores/CurrentUserStore';
import NavigationListener from '../Mixins/NavigationListener';
import NavBarHelper       from '../Mixins/NavBarHelper';

import Loading          from '../Screens/Loading';
import Text             from '../Components/Text';
import SegmentedControl from '../Components/SegmentedControl';
import SimpleList       from '../Components/SimpleList';

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
    var title = this.props.username ? this.props.username : i18n.t('dashboard');
    return { title: title };
  },

  getUsername: function() {
    if (!this.username) {
      this.username = this.props.username || CurrentUserStore.get().data.username;
    }
    return this.username;
  },

  renderItems: function() {
    return (
      <SimpleList
        style={styles.flex}
        currentRoute={this.props.currentRoute}
        getItemProps={this.getItemProps}
        items={this.state.items}
        reloadList={this.reloadList}
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

var i18n = Locale.key('ListHelper', {
  dashboard: 'Dashboard'
});

var styles = StyleSheet.create({
  flex: {
    flex: 1
  }
});

export default ListHelper;
