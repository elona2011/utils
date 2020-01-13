"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInRange = void 0;

// 获取区间随机数 左闭右闭
var getRandomInRange = function getRandomInRange(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

exports.getRandomInRange = getRandomInRange;