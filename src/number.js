// 获取区间随机数 左闭右闭
export const getRandomInRange = (min, max) => min + Math.floor(Math.random() * (max - min + 1))