import assign from '../Lib/assignDefined';

var Model = function(options, token) {
  this.data = {};
  this.token = token;
  this.setAttributes(options);
};

Model.prototype.setAttributes = function(options) {
  options = (options || {});
  assign(this.data, {
    id: options.id,
    username: options.username
  });
};

Model.prototype.getToken = function() {
  return this.token;
};

Model.prototype.isLoggedIn = function() {
  return !!this.token;
};

export default Model;
