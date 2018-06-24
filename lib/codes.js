'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rCodes = {},
    rVarNames = {};

var getCodes = exports.getCodes = function getCodes(len) {
  var r = getRawCodes(len);

  if (rCodes[r]) {
    return getCodes(len);
  } else {
    rCodes[r] = true;
    return r;
  }
};

var getRawCodes = function getRawCodes(len) {
  var codes = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      r = '';

  for (var i = 0; i < len; i++) {
    r += codes.charAt(getRandomInt(codes.length));
  }
  return r;
};

var getVarName = exports.getVarName = function getVarName(len) {
  if (len < 1) return '';
  var r = getAlphabet();
  if (len > 1) r += getRawCodes(len - 1);

  if (rVarNames[r]) {
    return getVarName(len);
  } else {
    rVarNames[r] = true;
    return r;
  }
};

var getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};
var getAlphabet = function getAlphabet() {
  var codes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return codes.charAt(getRandomInt(codes.length));
};