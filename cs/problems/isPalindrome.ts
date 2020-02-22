/**
 * Source: https://leetcode.com/problems/valid-palindrome/
 */

const isPalindrome = (string: string): boolean => {
  let forwardIndex = 0
  let backIndex = string.length - 1

  while (forwardIndex <= backIndex) {
    while(/\W/.test(string[forwardIndex])) {
      forwardIndex += 1
    }
    while(/\W/.test(string[backIndex])) {
      backIndex -= 1
    }

    const nextForwardChar = string[forwardIndex].toLowerCase()
    const nextBackChar = string[backIndex].toLowerCase()
    if (nextForwardChar !== nextBackChar) {
      return false
    }

    forwardIndex += 1
    backIndex -= 1
  }

  return true
}

export default isPalindrome
