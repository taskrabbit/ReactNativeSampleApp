'use strict';

var invariant = require('invariant');
var CSSVarConfig = require('../Lib/CSSVarConfig');

var cssVar = function(/*string*/ key) /*string*/ {
  invariant(CSSVarConfig[key], 'invalid css variable ' + key);

  return CSSVarConfig[key];
};

module.exports = cssVar;
