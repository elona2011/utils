let rCodes = {},
  rVarNames = {}

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
  let codes = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`,
    r = ''

  for (let i = 0; i < len; i++) {
    r += codes.charAt(getRandomInt(codes.length))
  }
  return r
}

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
const getAlphabet = () => {
  let codes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  return codes.charAt(getRandomInt(codes.length))
}
