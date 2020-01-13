"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParams = exports.zip2Chars = void 0;

/**
 * 二位字符压缩
 * @param x
 * @param codes
 */
var zip2Chars = function zip2Chars(key, codes) {
  if (key < 4096) {
    var r = getParams(key, 2, codes);
    return codes.charAt(r[0]) + codes.charAt(r[1]);
  } else {
    return codes.charAt(codes.length - 1) + codes.charAt(codes.length - 1);
  }
};
/**
 * 计算当前进制下的多项式参数
 * @param num
 */


exports.zip2Chars = zip2Chars;

var getParams = function getParams(num, size, codes) {
  var r = [],
      codesLen = codes.length;
  if (num < 0) num = 0;

  while (num >= codesLen) {
    r.push(num % codesLen);
    num = Math.floor(num / codesLen);
  }

  r.push(num);
  return editArrLen(r, size);
};
/**
 * 高位补0
 * @param arr
 */


exports.getParams = getParams;

var editArrLen = function editArrLen(arr, toLen) {
  while (arr.length < toLen) {
    arr.push(0);
  }

  return arr;
};