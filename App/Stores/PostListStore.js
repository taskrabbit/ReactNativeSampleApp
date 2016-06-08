import {EventEmitter} from 'events';
import assign from 'object-assign';

import Post         from '../Models/Post';
import Dispatcher   from '../Dispatcher';
import AppConstants from '../Constants/AppConstants';

var CHANGE_EVENT = 'change';

// TODO: Immutable?
var _hash = {};

function addModel(key, props) {
  if(!_hash[key]) _hash[key] = [];
  var model = new Post(props);
  _hash[key].unshift(model);
}

function setList(key, list) {
  var models = [];
  for(var i in list) {
    var model = new Post(list[i]);
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
    case AppConstants.POST_LIST_UPDATED:
      setList(action.listProps.username, action.listProps.posts);
      ModelStore.emitChange(action.listProps.username);
      break;
    case AppConstants.POST_ADDED:
      addModel(action.postProps.username, action.postProps);
      ModelStore.emitChange(action.postProps.username);
      break;
    // TODO: save
    default:
      // no op
  }
});

export default ModelStore; 