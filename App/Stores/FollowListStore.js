import {EventEmitter} from 'events';
import assign from 'object-assign';

import Follow       from '../Models/Follow';
import Dispatcher   from '../Dispatcher';
import AppConstants from '../Constants/AppConstants';

var CHANGE_EVENT = 'change';

// TODO: Immutable?
var _hash = {};

function setList(key, list) {
  var models = [];
  for(var i in list) {
    var model = new Follow(list[i]);
    models.push(model);
  }
  _hash[key] = models;
}

var ModelStore = assign({}, EventEmitter.prototype, {
  get: function(key) {
    return _hash[key];
  },

  emitChange: function(key) {
    this.emit(CHANGE_EVENT, key);
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
    case AppConstants.FOLLOW_LIST_UPDATED:
      setList(action.listProps.username, action.listProps.follows);
      ModelStore.emitChange(action.listProps.username);
      break;
    // TODO: save
    default:
      // no op
  }
});

export default ModelStore; 