import isPalindrome from './isPalindrome'

describe('isPalindrome()', () => {
  it('matches a palindrome regardless of non-word characters', () => {
    expect(isPalindrome('!A man, a plan, a canal: Panama?')).toBe(true)
    expect(isPalindrome('race a car')).toBe(false)
  })
})
