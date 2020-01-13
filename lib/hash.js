"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashCode = void 0;

var hashCode = function hashCode(s) {
  //no ast edit
  var hash = 0,
      i,
      chr;
  if (s.length === 0) return hash;

  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

exports.hashCode = hashCode;