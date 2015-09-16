// in memory database for testing

var _posts = {}
var _postsCount = 0;
var Post = function(user, content) {
  this.id = ++_postsCount;
  this.user_id  = user.id;
  this.user     = user;
  this.content  = content;
};

Post.create = function(user, content) {
  var post = new Post(user, content);
  _posts[post.id] = post;
  return post;
};


var _users = {} // id => user object
var _usersCount = 0;
var User = function(username) {
  this.id = ++_usersCount;
  this.username = username;
  this.password = null;
  this.posts = [];
};

User.findByUsername = function(username) {
  for(var id in _users) {
    if (_users[id].username === username) {
      return _users[id];
    }
  }
  return null;
};

User.findByToken = function(token) {
  for(var id in _users) {
    if (_users[id].token === token) {
      return _users[id];
    }
  }
  return null;
};

User.create = function(username, password) {
  var user = new User(username);
  user.password = password;
  user.token = Math.random().toString(36).substr(2);
  _users[user.id] = user;
  return user;
};

User.prototype.authenticate = function(password) {
  return this.password === password;
};

User.prototype.addPost = function(content) {
  var post = Post.create(this, content);
  this.posts.push(post);
  return post;
};

User.prototype.getPosts = function() {
  return this.posts;
};


// Seed some people
var bleonard = User.create('bleonard', 'sample');
var jrlai    = User.create('jrlai', 'sample');

bleonard.addPost('one');
bleonard.addPost('two');
bleonard.addPost('three');

exports.User = User;
exports.Post = Post;
