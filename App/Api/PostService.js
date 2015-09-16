var client = require('../Api/HTTPClient')

var PostService = {
  parsePost: function(data) {
    return {
      id: data.id,
      content: data.content
    };
  },

  parsePosts: function(response) {
    if (!response) return null;

    var out = {posts: []};
    for(var i in response.posts) {
      out.posts.push(PostService.parsePost(response.posts[i]));
    }
    out.username = response.username;
    return out;
  },

  fetchList: function(username, callback) {
    client.get("api/posts/" + username, {}, function(error, response) {
      var listProps = PostService.parsePosts(response);
      callback(error, listProps);
    });
  }
};

module.exports = PostService;
