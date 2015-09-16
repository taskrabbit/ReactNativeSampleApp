var passport = require("koa-passport");
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require("./models").User;

passport.use(new BearerStrategy({},
  function(token, done) {
    user = User.findByToken(token);
    if (user) return done(null, user);
    else return done(null, false);
  }
));

var secured = function *(next) {
    var _this = this;
    yield passport.authenticate("bearer", { session: false },
      function*(err, user, info) {
        if (err) {
          throw err;
        }
        else if (!user) {
          _this.status = 401;
          _this.body = {error: "Please log in"}
        } 
        else {
          _this.passport.user = user;
          yield next;
        }
    });
};

module.exports = secured;
