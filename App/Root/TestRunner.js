import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

const {
  TestRunnerManager,
  DevMenu,
} = NativeModules;

import client     from '../Api/HTTPClient';
import Dispatcher from '../Dispatcher';

import StatusBar from '../Platform/StatusBar';

var TestRunner = React.createClass({
  componentDidMount: function() {
    StatusBar.setHidden(true);
  },

  resetApp: function() {
    TestRunnerManager.reset(function() {
      console.log("reset")
    });
  },

  showDevMenu: function() {
    DevMenu.show();
  },

  hookConsole: function() {
    global.console = {
      log: function(...args) {
        client.post("test/console.json", {level: 'log', arguments: args});
      },
      error: function(...args) {
        client.post("test/console.json", {level: 'error', arguments: args});
      },
      warn: function(...args) {
        client.post("test/console.json", {level: 'warn', arguments: args});
      }
    }
  },

  bootstrapApp: function() {
    client.get("test/bootstrap.json", null,
      (error, response) => {
        if (error) {
          console.log("BOOTSTRAP ERROR");
          alert('"BOOTSTRAP ERROR"');
        }
        else {
          this.hookConsole();
          if (response.actions) {
            for (var i=0; i<response.actions.length; i++) {
              var options = response.actions[i].options || {};
              options.actionType = response.actions[i].type;

              switch(options.actionType) {
                default:
                  Dispatcher.dispatch(options);
              }
            }
          }
        }
      });
  },

  onLoadedTest: function(component) {
    if (this.props.routeUnderTest && this.props.routeUnderTest.setState) {
      component.setState(this.props.routeUnderTest.setState);
    }
  },

  renderRouteUnderTest: function() {
    if (!this.props.routeUnderTest) return null;

    var Component  = this.props.routeUnderTest.component;
    var testProps = this.props.routeUnderTest.passProps || {};
    return (
      <Component ref={this.onLoadedTest} {...testProps} />
    );
  },

  render: function() {
    var containerStyle = (this.props.routeUnderTest ? styles.withComponent : styles.noComponent);
    return (
      <View style={containerStyle}>
        {this.renderRouteUnderTest()}
        <View style={styles.bar}>
          <TouchableOpacity onPress={this.resetApp}>
            <Text style={styles.action}>
              ResetTest
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.bootstrapApp}>
            <Text style={styles.action}>
              Bootstrap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showDevMenu}>
            <Text style={styles.action}>
              DevMenu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  withComponent: {
    flex: 1
  },
  noComponent: {
    height: 10
  },
  bar: {
    height: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  action: {
    marginHorizontal: 4,
    fontSize: 10
  }
});

export default TestRunner;
