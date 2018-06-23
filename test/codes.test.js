import chai from 'chai'
import { getCodes, getVarName } from '../src/codes'

let expect = chai.expect

describe('getCodes', () => {
  it('length', () => {
    expect(getCodes(10).length).to.equal(10)
    expect(getCodes(20).length).to.equal(20)
    expect(getCodes(50).length).to.equal(50)
  })

  it('no repeat1', () => {
    let r = {},
      sameCode = false
    for (let i = 0; i < 30; i++) {
      let s = getCodes(1)
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
      let s = getCodes(2)
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
      let s = getCodes(12)
      if (r[s]) {
        sameCode = true
      } else {
        r[s] = true
      }
    }
    expect(sameCode).to.equal(false)
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
