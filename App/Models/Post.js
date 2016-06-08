import assign from '../Lib/assignDefined';

var Model = function(options) {
  this.data = {};
  this.setAttributes(options);
};

Model.prototype.setAttributes = function(options) {
  options = (options || {});
  assign(this.data, {
    id: options.id,
    content: options.content,
    username: options.username
  });
};

export default Model;
