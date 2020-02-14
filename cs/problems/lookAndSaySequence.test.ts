import lookAndSaySequence from './lookAndSaySequence'

describe('lookAndSaySequence()', () => {
  it('returns the first N numbers in the Look and Say sequence', () => {
    expect(lookAndSaySequence(6)).toEqual([1, 11, 21, 1211, 111221, 312211])
  })
})
