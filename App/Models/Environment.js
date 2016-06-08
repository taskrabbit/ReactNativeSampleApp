import assign from '../Lib/assignDefined';
import jsVersion from '../jsVersion';

var Model = function(options) {
  this.data = {};
  this.setAttributes(options);
};

Model.prototype.setAttributes = function(options) {
  options = (options || {});
  assign(this.data, {
    name: options.name,
    simulator: options.simulator,
    buildCode: parseInt(options.buildCode),
    version: options.version,
    locale: options.locale
  });
};

Model.prototype.getApiHost = function() {
  switch(this.data.name) {
    case 'test':
      return 'http://localhost:3001';
    case 'debug':
      return 'http://localhost:3000';
    case 'staging':
      return 'https://someday.herokuapp.com';
    default:
      throw("Unknown Environment.getApiHost: " + this.data.name);
  }
};

Model.prototype.combinedBuildCode = function() {
  var ios = this.data.buildCode * 1000000;
  return ios + jsVersion;
};

Model.prototype.displayVersion = function() {
  var out = this.data.version;
  out += "." + this.data.buildCode;
  out += "." + jsVersion;
  return out;
};

Model.prototype.getLocale = function() {
  return this.data.locale;
};

export default Model;
