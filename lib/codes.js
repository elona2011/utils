'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rCodes = {},
    rVarNames = {};

var Alphanums = exports.Alphanums = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var Alphabets = exports.Alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * 获取一个随机字符串，包括字母和数字，长度为len
 * @param {*} len 长度
 */
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
  var r = '';

  for (var i = 0; i < len; i++) {
    r += Alphanums.charAt(getRandomInt(Alphanums.length));
  }
  return r;
};

/**
 * 获取一个随机字符串，包括字母和数字，首字符为字母，总长度为len
 * @param {*} len 长度
 */
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
  return Alphabets.charAt(getRandomInt(Alphabets.length));
};