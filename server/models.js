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

// Seed some users
var bleonard    = User.create('bleonard', 'sample', 'qwertyuiopasdfghjkl');
var jrichardlai = User.create('jrichardlai', 'sample', 'poiuytrewqlkjhgfdsa');
var taskrabbit  = User.create('taskrabbit', 'sample', 'zxcvbnmqwertlkjhg');

bleonard.addPost("When you have a use case and wish an app existed. Then you remember you made it 7 years ago. #boston");
bleonard.addPost("I keep getting a facebook notification that asks if I know Nathan Cron.\nIt seems like every few days around this time #destiny");
bleonard.addPost("Learning CSS...\nDaughter: Put it in the middle between the top and bottom.\nDad: (googles again) Are you sure?");
bleonard.addPost("#reactjs #flux child components are like teenagers. they don't tell parents what they are up to. parent has to hear later from dispatcher.");

jrichardlai.addPost("The problem with Rails today is that 1/2 the people are afraid Rails is turning into Java and the other 1/2 are trying to turn it into Java");
jrichardlai.addPost("Thanks @TaskRabbit to allow my party of 10 people to eat at House of Prime Ribs with 0 minutes wait :)! Yummy! #TaskTuesday");

taskrabbit.addPost("When you're a #NewParent tasks can really pile up. We can help! Check out our Task of the Week http://tinyurl.com/pxh88f8");
taskrabbit.addPost("@TaskRabbit CEO @leahbusque talks about confidence necessary to propel your idea forward #DF15WomenLead #df15");
taskrabbit.addPost("Happiness is the sound of someone else building your IKEA furniture. #taskrabbit");

bleonard.addFollow(jrichardlai);
bleonard.addFollow(taskrabbit);

jrichardlai.addFollow(bleonard);
jrichardlai.addFollow(taskrabbit);

taskrabbit.addFollow(bleonard);

exports.User = User;
