// https://github.com/ide/react-native-button

import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';

import cssVar     from '../Lib/cssVar';
import Text       from '../Components/Text';
import AppActions from '../Actions/AppActions';

var SegmentedControl = React.createClass({
  segmentComponents: function() {
    var out = [];
    for(var i = 0; i < this.props.items.length; i++) {
      var item = this.props.items[i];
      var testID = null;
      if (!item.testID && this.props.appendTestId) {
        testID = 'seg' + item.title + '_' + this.props.appendTestId;
      }
      out.push(
        <Segment {...item} key={"item" + i} testID={testID} currentRoute={this.props.currentRoute} />
      );
    };
    return out;
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.control}>
          {this.segmentComponents()}
        </View>
      </View>
    );
  }
});

var Segment = React.createClass({
  onSelection: function() {
    AppActions.launchRelativeItem(this.props.currentRoute, this.props);
  },

  render: function() {
    if (this.props.selected) {
      return (
        <View
          style={[styles.flex, styles.selectedSegment]}
        >
          <View style={[styles.button]}>
            <Text style={[styles.text, styles.selectedText]}>
              {this.props.title}
            </Text>
          </View>
        </View>
      );
    }
    else {
      return (
        <TouchableHighlight
          style={styles.flex}
          underlayColor='#FFFFFF'
          testID={this.props.testID}
          onPress={this.onSelection}
        >
          <View style={[styles.button, styles.linkButton]}>
            <Text style={[styles.text, styles.linkText]}>
              {this.props.title}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }
  }
});


var styles = StyleSheet.create({
  container: {
    backgroundColor: cssVar('blue50'),
    padding: 10
  },
  control: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4
  },
  flex: {
    flex: 1
  },
  button: {
    padding: 5,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSegment: {
    backgroundColor: 'white',
  },
  linkButton: {
    backgroundColor: cssVar('blue50'),
  },
  text: {
    fontSize: 16
  },
  selectedText: {
    color: cssVar('blue50'),
  },
  linkText: {
    color: 'white'
  }
});

export default SegmentedControl;
