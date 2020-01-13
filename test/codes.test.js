import chai from 'chai'
import { getCodes, getVarName, Alphanums, getVarNameExcept } from '../src/codes'
import {
  generateToken,
  TokenCount,
  Range,
  CountComposition,
  GenConstantSumToken,
} from '../src/token'
let expect = chai.expect
describe('getCodes', () => {
  it('length', () => {
    expect(getCodes(10, Alphanums).length).to.equal(10)
    expect(getCodes(20, Alphanums).length).to.equal(20)
    expect(getCodes(50, Alphanums).length).to.equal(50)
  })

  it('no repeat1', () => {
    let r = {},
      sameCode = false
    for (let i = 0; i < 30; i++) {
      let s = getCodes(1, Alphanums)
      if (r[s]) {
        sameCode = true
      } else {
        r[s] = true
      }
    }
    expect(sameCode).to.equal(false)
  })

  it('no repeat2', () => {
    let r = {},
      sameCode = false
    for (let i = 0; i < 200; i++) {
      let s = getCodes(2, Alphanums)
      if (r[s]) {
        sameCode = true
      } else {
        r[s] = true
      }
    }
    expect(sameCode).to.equal(false)
  })

  it('no repeat3', () => {
    let r = {},
      sameCode = false
    for (let i = 0; i < 1000; i++) {
      let s = getCodes(12, Alphanums)
      if (r[s]) {
        sameCode = true
      } else {
        r[s] = true
      }
    }
    expect(sameCode).to.equal(false)
  })
})

describe('getVarNameExcept', () => {
  it('codes', () => {
    let g = getVarNameExcept({ codes: 'abc' })
    expect(g()).to.equal('a')
    expect(g()).to.equal('b')
    expect(g()).to.equal('c')
    expect(g()).to.equal('aa')
    expect(g()).to.equal('ab')
    expect(g()).to.equal('ac')
    expect(g()).to.equal('ba')
    expect(g()).to.equal('bb')
    expect(g()).to.equal('bc')
    expect(g()).to.equal('ca')
    expect(g()).to.equal('cb')
    expect(g()).to.equal('cc')
    expect(g()).to.equal('aaa')
    expect(g()).to.equal('aab')
    expect(g()).to.equal('aac')
    expect(g()).to.equal('aba')
    expect(g()).to.equal('abb')
  })
})

describe('getVarName', () => {
  it('length', () => {
    expect(getVarName(10).length).to.equal(10)
    expect(getVarName(20).length).to.equal(20)
    expect(getVarName(50).length).to.equal(50)
  })

  it('no repeat1', () => {
    let r = {},
      sameCode = false
    for (let i = 0; i < 30; i++) {
      let s = getVarName(1)
      if (r[s]) {
        sameCode = true
      } else {
        r[s] = true
      }
    }
    expect(sameCode).to.equal(false)
  })

  it('no repeat2', () => {
    let r = {},
      sameCode = false
    for (let i = 0; i < 200; i++) {
      let s = getVarName(2)
      if (r[s]) {
        sameCode = true
      } else {
        r[s] = true
      }
    }
    expect(sameCode).to.equal(false)
  })

  it('no repeat3', () => {
    let r = {},
      sameCode = false
    for (let i = 0; i < 1000; i++) {
      let s = getVarName(12)
      if (r[s]) {
        sameCode = true
      } else {
        r[s] = true
      }
    }
    expect(sameCode).to.equal(false)
  })
})

describe('generate token', () => {
  it('correct length', () => {
    let token = generateToken({ total: 20 })
    expect(token.length).to.equal(20)
  })
  it('correct range random', () => {
    let range = new Range(40, 45)
    let inRange = true
    let times = 50
    while (times > 0) {
      let randomNum = range.random()
      if (randomNum < range.range.i || randomNum > range.range.a) {
        inRange = false
      }
      times--
    }
    expect(inRange).to.equal(true)
  })
  let range1 = new Range(40, 50)
  let range2 = new Range(60, 100) //100-150
  let comp = new CountComposition(range1, range2)
  it('composition check to be true', () => {
    let correct = true
    let nums = [100, 120, 150]
    nums.forEach(num => {
      if (!comp.check(num)) {
        correct = false
      }
    })
    expect(correct).to.equal(true)
  })

  it('composition check to be false', () => {
    let correct = true
    let nums = [99, 151, 500]
    nums.forEach(num => {
      if (comp.check(num)) {
        correct = false
      }
    })
    expect(correct).to.equal(true)
  })

  it('composition random equal to count', () => {
    let total = 133
    let str = comp.random(new TokenCount(total))
    expect(str.charCodeAt(0) + str.charCodeAt(1)).to.equal(total)
  })

  it('random code should not contain char out of range', () => {
    let correct = true
    let times = 50
    while (times > 0) {
      let count = Math.floor(Math.random() * (244 - 96 + 1)) + 96
      var tokenizer = new GenConstantSumToken(count)
      var last2 = tokenizer.generate()
      var char1 = last2.charCodeAt(0)
      var char2 = last2.charCodeAt(1)
      if (char1 < 48 || (char1 < 65 && char1 > 57) || (char1 < 97 && char1 > 90) || char1 > 122) {
        correct = false
      }
      if (char2 < 48 || (char2 < 65 && char2 > 57) || (char2 < 97 && char2 > 90) || char2 > 122) {
        correct = false
      }
      expect(correct).to.equal(true)
      times--
    }
    // var numR = new Range(48, 57)
    // var lowA = new Range(65, 90)
    // var highA = new Range(97, 122)
  })
})
