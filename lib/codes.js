"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateDict = generateDict;
exports.randomUnicodeDict = exports.toUnicode = exports.getBase64RandomCode = exports.randomStr = exports.getSequenceVarName = exports.getRawVarName = exports.getVarNameExcept = exports.getVarName = exports.getRawCodes = exports.getCodes = exports.jsReservedWords = exports.Base64CodePool = exports.Alphabets = exports.Alphanums = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var rCodes = {},
    rVarNames = {};
var Alphanums = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
exports.Alphanums = Alphanums;
var Alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
exports.Alphabets = Alphabets;
var Base64CodePool = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_~";
exports.Base64CodePool = Base64CodePool;
var jsReservedWords = {
  "abstract": 1,
  "else": 1,
  "instanceof": 1,
  "super": 1,
  "boolean": 1,
  "enum": 1,
  "int": 1,
  "switch": 1,
  "break": 1,
  "export": 1,
  "interface": 1,
  "synchronized": 1,
  "byte": 1,
  "extends": 1,
  "let": 1,
  "this": 1,
  "case": 1,
  "false": 1,
  "long": 1,
  "throw": 1,
  "catch": 1,
  "final": 1,
  "native": 1,
  "throws": 1,
  "char": 1,
  "finally": 1,
  "new": 1,
  "transient": 1,
  "class": 1,
  "float": 1,
  "null": 1,
  "true": 1,
  "const": 1,
  "for": 1,
  "package": 1,
  "try": 1,
  "continue": 1,
  "function": 1,
  "private": 1,
  "typeof": 1,
  "debugger": 1,
  "goto": 1,
  "protected": 1,
  "var": 1,
  "default": 1,
  "if": 1,
  "public": 1,
  "void": 1,
  "delete": 1,
  "implements": 1,
  "return": 1,
  "volatile": 1,
  "do": 1,
  "import": 1,
  "short": 1,
  "while": 1,
  "double": 1,
  "in": 1,
  "static": 1,
  "with": 1
};
/**
 * 获取一个随机字符串，包括字母和数字，长度为len
 * 确保重复调用生成的字符串不会重复
 * @param {*} len 长度
 */

exports.jsReservedWords = jsReservedWords;

var getCodes = function getCodes(len, codes) {
  var r = getRawCodes(len, codes);

  if (rCodes[r]) {
    return getCodes(len, codes);
  } else {
    rCodes[r] = true;
    return r;
  }
};
/**
 * 获取一个随机字符串，包括字母和数字，长度为len
 * 可能会生成重复字符串
 * @param {*} len
 * @param {*} codes
 */


exports.getCodes = getCodes;

var getRawCodes = function getRawCodes(len, codes) {
  var r = '';

  for (var i = 0; i < len; i++) {
    r += codes.charAt(getRandomInt(codes.length));
  }

  return r;
};
/**
 * 获取一个随机字符串，包括字母和数字，首字符为字母，总长度为len
 * 确保重复调用生成的变量名不会重复
 * @param {*} len 长度
 */


exports.getRawCodes = getRawCodes;

var getVarName = function getVarName(len) {
  if (len < 1) return '';
  var r = getAlphabet();
  if (len > 1) r += getRawCodes(len - 1, Alphanums);

  if (rVarNames[r]) {
    return getVarName(len);
  } else {
    rVarNames[r] = true;
    return r;
  }
};

exports.getVarName = getVarName;
var usedNames = Object.create(null);
var failIndex = Object.create(null);
var codesIndex = Object.create(null);
/**
 * 类似getVarName，但可传入exceptNames，保证生成的变量名与exceptNames中的不会重复
 * @param {*} exceptNames
 */

var getVarNameExcept = function getVarNameExcept() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (_typeof(options) !== 'object' || options === null) {
    throw new Error('options must be object');
  }

  if (!options.group) {
    options.group = 'default';
  }

  usedNames[options.group] = Object.create(null);
  options.exceptNames && Object.keys(options.exceptNames).forEach(function (n) {
    usedNames[options.group][n] = 1;
  });
  failIndex[options.group] = 0;
  codesIndex[options.group] = [];
  /**
   * len 变量名长度，当前长度快用完时，会自动加1
   * group 组名，同一组内变量名不会重复，不同组可能重复
   */

  return function _name() {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    if (len < 1) return '';
    var r;

    if (options.codes) {
      if (codesIndex[options.group].length < len) {
        for (var i = 0; i < len; i++) {
          codesIndex[options.group][i] = 0;
        }
      } //进位


      for (var _i = codesIndex[options.group].length - 1; _i > 0; _i--) {
        if (codesIndex[options.group][_i] >= options.codes.length) {
          codesIndex[options.group][_i] = 0;
          codesIndex[options.group][_i - 1]++;
        }
      } //增加长度


      if (codesIndex[options.group][0] >= options.codes.length) {
        return _name(len + 1);
      } //get result


      r = codesIndex[options.group].reduceRight(function (a, b, i, arr) {
        var r = options.codes[b] + a; // console.log(arr, i)
        // if (arr[i] >= options.codes.length - 1 && i > 0) {
        //   arr[i] = 0
        //   arr[i - 1]++
        // } else {
        //   arr[i] += 1
        // }

        return r;
      }, '');
      codesIndex[options.group][codesIndex[options.group].length - 1]++;
      return r;
    } else {
      r = getAlphabet();
      if (len > 1) r += getRawCodes(len - 1, Alphanums);

      if (usedNames[options.group][r] || jsReservedWords[r]) {
        if (failIndex[options.group] >= 10) {
          //连续十次取到已有变量名，则变量名长度加1
          len += 1;
          failIndex[options.group] = 0;
        } else {
          //第一次取到重复变量名，则再试一次
          failIndex[options.group] += 1;
        }

        return _name(len);
      } else {
        usedNames[options.group][r] = true;
        return r;
      }
    }
  };
};
/**
 * 获取一个随机字符串，包括字母和数字，首字符为字母，总长度为len
 * 生成的变量名可能重复
 * @param {*} len 长度
 */


exports.getVarNameExcept = getVarNameExcept;

var getRawVarName = function getRawVarName(len) {
  var r = getAlphabet();
  if (len > 1) r += getRawCodes(len - 1, Alphanums);
  return r;
};

exports.getRawVarName = getRawVarName;

var getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};

var getAlphabet = function getAlphabet() {
  return Alphabets.charAt(getRandomInt(Alphabets.length));
};
/**
 * 生成一个固定的字符串数列，如abc0,abc1,abc2...
 */


var getSequenceVarName = function getSequenceVarName() {
  var preVarName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getRawCodes(8, Alphabets);
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return function () {
    return preVarName + i++;
  };
}; // 生成某个区间的字典 e.g. generateDict(0, 127)


exports.getSequenceVarName = getSequenceVarName;

function generateDict(min, max) {
  var dict = '';

  for (var i = min; i <= max; i++) {
    dict += String.fromCharCode(i);
  }

  return dict;
} // 乱序字符串


var randomStr = function randomStr(str) {
  return str.split('').sort(function () {
    return Math.random() - 0.5;
  }).join('');
};

exports.randomStr = randomStr;

var getBase64RandomCode = function getBase64RandomCode() {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Base64CodePool;
  return randomStr(code);
};

exports.getBase64RandomCode = getBase64RandomCode;

var toUnicode = function toUnicode(str) {
  var ret = '';
  var len = str.length;
  var i = 0;

  while (i < len) {
    var unicode = "\\u" + ('0000' + str.charCodeAt(i).toString(16)).slice(-4);
    ret += unicode;
    i++;
  }

  return ret;
};

exports.toUnicode = toUnicode;

var randomUnicodeDict = function randomUnicodeDict() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 127;
  return toUnicode(randomStr(generateDict(min, max)));
};

exports.randomUnicodeDict = randomUnicodeDict;