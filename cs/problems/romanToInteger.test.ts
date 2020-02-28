import romanToInteger from './romanToInteger'

describe('romanToInteger()', () => {
  it('translates roman numerals to integers', () => {
    expect(romanToInteger('III')).toBe(3)
    expect(romanToInteger('LVIII')).toBe(58)
    expect(romanToInteger('MCMXCIV')).toBe(1994)
  })
})
