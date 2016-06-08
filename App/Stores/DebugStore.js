import React             from 'react';
import { NativeModules } from 'react-native';
import { EventEmitter }  from 'events';

import Dispatcher    from '../Dispatcher';
import AppConstants  from '../Constants/AppConstants';
import LocalKeyStore from '../Stores/LocalKeyStore';

const EnvironmentManager = NativeModules.EnvironmentManager;

const CHANGE_EVENT                 = 'change';
const DEBUG_CURRENT_ROUTE_PATH_KEY = AppConstants.DEBUG_CURRENT_ROUTE_PATH_KEY;

var _values = null;

function setCurrentRoutePath(routePath) {
  _values = _values || {};
  _values.currentRoutePath = routePath;
}

function resetData() {
  _values = {};
}

var SingletonStore = Object.assign({}, EventEmitter.prototype, {
  get() {
    return _values;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

Dispatcher.register(function(action) {
  switch (action.actionType) {
    case AppConstants.APP_LAUNCHED:
      LocalKeyStore.getKey(DEBUG_CURRENT_ROUTE_PATH_KEY, (error, routePath) => {
        setCurrentRoutePath(routePath);
        SingletonStore.emitChange();
      });
      break;
    case AppConstants.LAUNCH_ROUTE_PATH:
      if (action.routePath) {
        LocalKeyStore.setKey(DEBUG_CURRENT_ROUTE_PATH_KEY, action.routePath);
        setCurrentRoutePath(action.routePath);
      }
      break;
    case AppConstants.LOGOUT_REQUESTED:
      resetData();
      LocalKeyStore.setKey(DEBUG_CURRENT_ROUTE_PATH_KEY, '');
      SingletonStore.emitChange();
      break;
    default:
      // no op
  }
});

export default SingletonStore;
