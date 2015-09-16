// in memory database for testing

var _users = {}
var _usersCount = 0;
var User = function(username) {
  this.id = ++_usersCount;
  this.username = username;
  this.password = null;
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

// Seed some people
User.create('bleonard', 'sample');
User.create('jrlai', 'sample');


exports.User = User;
