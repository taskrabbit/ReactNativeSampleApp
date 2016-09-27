import {EventEmitter} from 'events';
import assign   from 'object-assign';
import Keychain from '../Platform/Keychain';

import CurrentUser    from '../Models/CurrentUser';
import LocalKeyStore  from '../Stores/LocalKeyStore';
import Dispatcher     from '../Dispatcher';
import AppConstants   from '../Constants/AppConstants';

var CHANGE_EVENT     = 'change';
var LOCAL_STORE_KEY  = 'CurrentUser';
var KEYCHAIN_SERVICE = 'Sample';

// null so we know to initialize on app launch
var _singleton = null;

function initSingleton(storedProps, token, username) {
  if (storedProps && token && username) {
    if (storedProps.id && storedProps.id.toString() === username.toString()) {
      // matches
      setUserProps(storedProps, token);
      return;
    }
  }
  setUserProps(null, null);
}

function setUserProps(storedProps, token) {
  _singleton = new CurrentUser(storedProps, token);
}

function saveSingleton() {
  if(_singleton) {
    LocalKeyStore.setKey(LOCAL_STORE_KEY, _singleton.data);
    if (_singleton.data.id && _singleton.getToken()) {
      Keychain.setGenericPassword(_singleton.data.id.toString(), _singleton.getToken(), KEYCHAIN_SERVICE);
    }
  }
}

function clearData() {
  _singleton = new CurrentUser(null, null);
  LocalKeyStore.setKey(LOCAL_STORE_KEY, null);
  Keychain.resetGenericPassword(KEYCHAIN_SERVICE);
}

var SingletonStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _singleton;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
Dispatcher.register(function(action) {
  switch(action.actionType) {
    case AppConstants.APP_LAUNCHED:
      Keychain.getGenericPassword(KEYCHAIN_SERVICE).then((values) => {
        const { username, password } = values || {};
        // password is the stored token.
        LocalKeyStore.getKey(LOCAL_STORE_KEY, (storeError, props) => {
          initSingleton(props, password, username);
          SingletonStore.emitChange();
        });
      }).catch((error) => {
        console.log(error);
        initSingleton({}, null, null);
        SingletonStore.emitChange();
      });
      break;
    case AppConstants.LOGIN_USER:
    case AppConstants.USER_UPDATED:
      setUserProps(action.userProps, action.token);
      SingletonStore.emitChange();
      saveSingleton();
      break;
    case AppConstants.LOGOUT_REQUESTED:
      clearData();
      SingletonStore.emitChange();
      break;
    default:
      // no op
  }
});

export default SingletonStore;
