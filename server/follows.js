var User = require('./models').User;

var renderFollow = function(follow) {
  return {
    id: follow.follow_id,
    username: follow.username
  };
};

var renderFollows = function(user) {
  var out = {
    follows: [],
    username: user.username
  };
  var follows = user.getFollows();
  for(var i in follows) {
    var follow = follows[i];
    out.follows.push(renderFollow(follow));
  }

  return out;
};

exports.userFollows = function *() {
  var username = this.params.username;
  var user = User.findByUsername(username);
  if (!user) {
    this.throw("No user found", 404);
  }
  this.status = 200;
  this.body = renderFollows(user);
};
