'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _codes = require('./codes');

Object.keys(_codes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _codes[key];
    }
  });
});

var _hash = require('./hash');

Object.keys(_hash).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hash[key];
    }
  });
});