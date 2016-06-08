// http://visionmedia.github.io/superagent
import superagent from 'superagent';

import Network from '../Api/Network';

import CurrentUserStore from '../Stores/CurrentUserStore';
import EnvironmentStore from '../Stores/EnvironmentStore';

var HTTPClient = {
  wrapper: function(inner) {
    return function(error, response) {
      Network.completed();

      if(!inner) return;
      // chance to wrap and call original

      var parsed = null;
      if(response && response.text && response.text.length > 0) {
        try {
           parsed = JSON.parse(response.text);
        }
        catch (e) {
           parsed = null;
           // TODO: some other error?
           console.log("HTTPClient could not parse:\n\n" + response.text);
        }
      }

      var errorObj = null;
      var valueObj = null;

      if (error) {
        // error.status => 422
        errorObj = {};
        if (error.status) {
          errorObj.status = error.status; // 422
        }
        else {
          errorObj.status = 520; // Unknown error
        }

        errorObj.errors = [];
        if (parsed && parsed.error) {
          errorObj.message = parsed.error
        }
        if (!errorObj.message) {
          errorObj.message = 'Server Error: ' + errorObj.status;
        }
        console.log("http error (" + errorObj.status + "): " + errorObj.message);
      }
      else {
        valueObj = parsed;
      }
      inner(errorObj, valueObj);
    };
  },

  addHeaders: function(req) {
    // TODO: load version from somewhere
    var appVersion = "1.0";
    var userAgent = "Sample iPhone v" + appVersion;
    var locale = 'en-US';

    req = req.accept('application/json');
    req = req.type('application/json');
    req = req.set('User-Agent', userAgent);
    req = req.set('X-CLIENT-VERSION', appVersion);
    req = req.set('X-Sample-User-Agent', userAgent);
    req = req.set('X-LOCALE', locale);

    var currentUser = CurrentUserStore.get();
    if (currentUser && currentUser.getToken()) {
      req = req.set('Authorization', 'Bearer ' + currentUser.getToken());
    }

    // if (currentUser && currentUser.data.guid) {
    //   req = req.set('X-GUID', currentUser.data.guid);
    // }
    // if (currentUser && currentUser.data.ab_decision_group_id) {
    //   req = req.set('X-AB-DECISION-GROUP-ID', currentUser.data.ab_decision_group_id.toString());
    // }
    // if (currentUser && currentUser.data.ab_decision) {
    //   req = req.set('X-AB-DECISION', currentUser.data.ab_decision);
    // }

    return req;
  },

  fetch: function(req, callback) {
    req = this.addHeaders(req);
    Network.started();
    req.end(this.wrapper(callback));
  },

  url: function(path) {
    var host = EnvironmentStore.get().getApiHost();
    return host + "/" + path;
  },

  post: function(path, values, callback) {
    var req = superagent.post(this.url(path));
    if (values) {
      req = req.send(values);
    }
    this.fetch(req, callback);
  },

  put: function(path, values, callback) {
    var req = superagent.put(this.url(path));
    if (values) {
      req = req.send(values);
    }
    this.fetch(req, callback);
  },


  get: function(path, params, callback) {
    var req = superagent.get(this.url(path));
    if (params) {
      req = req.query(params);
    }
    this.fetch(req, callback);
  }
};

export default HTTPClient;
