var React  = require('react-native');
var {
  ListView
} = React;

var SimpleListItem = require('../Components/SimpleListItem');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var SimpleList = React.createClass({
  renderRow: function(item, sectionId, rowId) {
    var passAlong = {};
    if (this.props.currentRoute) passAlong.currentRoute = this.props.currentRoute;
    if (this.props.navigator)    passAlong.navigator    = this.props.navigator;
    if (this.props.nextIcon)     passAlong.nextIcon     = this.props.nextIcon;
    return (
      <SimpleListItem {...passAlong} {...item} key={"item" + rowId} />
    );
  },

  render: function() {
    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        dataSource={ds.cloneWithRows(this.props.items)}
        renderRow={this.renderRow}
      />
    );
  }
});

module.exports = SimpleList;
