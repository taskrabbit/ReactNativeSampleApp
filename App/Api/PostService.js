import client from '../Api/HTTPClient';

var PostService = {
  parsePost: function(response) {
    if (!response) return null;

    return {
      id: response.id,
      content: response.content,
      username: response.username
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
  },

  createPost: function(content, callback) {
    client.post("api/posts", {content: content}, function(error, response) {
      var postProps = PostService.parsePost(response);
      callback(error, postProps);
    });
  },
};

export default PostService;
