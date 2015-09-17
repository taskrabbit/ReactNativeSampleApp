var User = require('./models').User;

var renderPost = function(post) {
  return {
    id: post.id,
    content: post.content,
    username: post.username
  };
};

var renderPosts = function(user) {
  var out = {
    posts: [],
    username: user.username
  };
  var posts = user.getPosts();
  for(var i in posts) {
    var post = posts[i];
    out.posts.push(renderPost(post));
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

exports.createPost = function *() {
  var user = this.passport.user;
  var params = this.request.body || {};
  var content = (params.content || "").trim();
  
  if(!content) this.throw("No content provided", 422);

  var post = user.addPost(content);

  this.status = 201;
  this.body = renderPost(post);
};
