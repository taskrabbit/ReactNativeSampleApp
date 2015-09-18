// in memory database for testing

var _postsCount = 0;
var Post = function(user, content) {
  this.id = ++_postsCount;
  this.user_id  = user.id;
  this.username = user.username;
  this.user     = user;
  this.content  = content;
};

Post.create = function(user, content) {
  var post = new Post(user, content);
  return post;
};


var _followCount = 0;
var Follow = function(user, other) {
  this.id = ++_followCount;
  this.user_id   = user.id;
  this.user      = user;
  this.follow_id = other.id;
  this.username  = other.username;
  this.folows    = other;
};

Follow.create = function(user, other) {
  var follow = new Follow(user, other);
  return follow;
};


var _users = {} // id => user object
var _usersCount = 0;
var User = function(username) {
  this.id = ++_usersCount;
  this.username = username;
  this.password = null;
  this.posts    = [];
  this.follows  = [];
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

User.create = function(username, password, token) {
  var user = new User(username);
  user.password = password;
  user.token = token || Math.random().toString(36).substr(2);
  _users[user.id] = user;
  return user;
};

User.prototype.authenticate = function(password) {
  return this.password === password;
};

User.prototype.addPost = function(content) {
  var post = Post.create(this, content);
  this.posts.unshift(post);
  return post;
};

User.prototype.getPosts = function() {
  return this.posts;
};

User.prototype.addFollow = function(other) {
  var follow = Follow.create(this, other);
  this.follows.unshift(follow);
  return follow;
};

User.prototype.getFollows = function() {
  return this.follows;
};

// Seed some people
var bleonard = User.create('bleonard', 'sample', 'qwertyuiopasdfghjkl');
var jrlai    = User.create('jrlai', 'sample', 'poiuytrewqlkjhgfdsa');
var david    = User.create('david', 'sample', 'zxcvbnmqwertlkjhg');

bleonard.addPost('one');
bleonard.addPost('two');
bleonard.addPost('three');
bleonard.addFollow(david);
bleonard.addFollow(jrlai);

jrlai.addPost('four');
jrlai.addFollow(david);

exports.User = User;
