let rCodes = {},
  rVarNames = {}

export const Alphanums = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`
export const Alphabets = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`

/**
 * 获取一个随机字符串，包括字母和数字，长度为len
 * @param {*} len 长度
 */
export const getCodes = len => {
  let r = getRawCodes(len)

  if (rCodes[r]) {
    return getCodes(len)
  } else {
    rCodes[r] = true
    return r
  }
}

const getRawCodes = len => {
  let r = ''

  for (let i = 0; i < len; i++) {
    r += Alphanums.charAt(getRandomInt(Alphanums.length))
  }
  return r
}

/**
 * 获取一个随机字符串，包括字母和数字，首字符为字母，总长度为len
 * @param {*} len 长度
 */
export const getVarName = len => {
  if (len < 1) return ''
  let r = getAlphabet()
  if (len > 1) r += getRawCodes(len - 1)

  if (rVarNames[r]) {
    return getVarName(len)
  } else {
    rVarNames[r] = true
    return r
  }
}

const getRandomInt = max => Math.floor(Math.random() * max)
const getAlphabet = () => Alphabets.charAt(getRandomInt(Alphabets.length))
