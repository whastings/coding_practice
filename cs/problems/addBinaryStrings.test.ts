import addBinaryStrings from './addBinaryStrings'

describe('addBinaryStrings()', () => {
  it('adds two binary numbers represented as strings', () => {
    expect(addBinaryStrings('11', '1')).toBe('100')
    expect(addBinaryStrings('1010', '1011')).toBe('10101')
    expect(addBinaryStrings('1111', '10')).toBe('10001')
  })
})
