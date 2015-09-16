var User = require('./models').User;

var renderPosts = function(user) {
  var out = {
    posts: [],
    username: user.username
  };
  var posts = user.getPosts();
  for(var i in posts) {
    var post = posts[i];
    out.posts.push({
      id: post.id,
      content: post.content
    });
  }

  return out;
};

exports.userPosts = function *() {
  var username = this.params.username;
  var user = User.findByUsername(username);
  if (!user) {
    this.throw("No user found", 404);
  }
  this.status = 200;
  this.body = renderPosts(user);
};