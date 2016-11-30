import React from 'react';
import {
  ListView
} from 'react-native';

import RefreshableListView from '../Platform/RefreshableListView';

import SimpleListItem from '../Components/SimpleListItem';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var SimpleList = React.createClass({
  renderRow: function(item, sectionId, rowId) {
    var passAlong = {};
    if (this.props.currentRoute) passAlong.currentRoute = this.props.currentRoute;
    if (this.props.navigation)   passAlong.navigation   = this.props.navigation;
    if (this.props.nextIcon)     passAlong.nextIcon     = this.props.nextIcon;
    if (this.props.noTap)        passAlong.noTap        = this.props.noTap;

    if (this.props.getItemProps) {
      // swtich it out
      item = this.props.getItemProps(item);
    }

    return (
      <SimpleListItem {...passAlong} {...item} key={"item" + (item.key || rowId)} />
    );
  },

  render: function() {
    var Component = this.props.reloadList ? RefreshableListView : ListView;
    return (
      <Component
        automaticallyAdjustContentInsets={false}
        dataSource={ds.cloneWithRows(this.props.items)}
        renderRow={this.renderRow}
        loadData={this.props.reloadList}
      />
    );
  }
});

export default SimpleList;
