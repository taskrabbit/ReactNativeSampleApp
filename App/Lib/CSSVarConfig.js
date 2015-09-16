'use strict';

var React  = require('react-native');
var {
  PixelRatio
} = React;

module.exports = {
  gray90: '#323A3B',
  gray30: '#B4B9B9',
  gray20: '#CFD2D3',
  gray10: '#EBECEC',
  gray5:  '#F5F6F6',

  blue50: '#23B4D2',

  // http://iosfonts.com/
  fontRegular: "HelveticaNeue",
  fontIcon: "HelveticaNeue", // TODO: get an icon font and include

  listLine: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(), // thinnest possible line
    marginLeft: 10,
  },
  listFullLine: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(), // thinnest possible line
    marginLeft: 0,
  }
};
