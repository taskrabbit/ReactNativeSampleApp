import client from '../Api/HTTPClient';

var FolllowService = {
  parseFolllow: function(response) {
    if (!response) return null;

    return {
      id: response.id,
      username: response.username
    };
  },

  parseFolllows: function(response) {
    if (!response) return null;

    var out = {follows: []};
    for(var i in response.follows) {
      out.follows.push(FolllowService.parseFolllow(response.follows[i]));
    }
    out.username = response.username;
    return out;
  },

  fetchList: function(username, callback) {
    client.get("api/follows/" + username, {}, function(error, response) {
      var listProps = FolllowService.parseFolllows(response);
      callback(error, listProps);
    });
  }
};

export default FolllowService;
