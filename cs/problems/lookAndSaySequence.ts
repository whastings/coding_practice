/**
 * Look and Say Sequence
 *
 * Source: https://medium.com/@matthew.reid.os1/exploring-the-look-and-say-sequence-using-javascript-6a1aee8a88a3
 */

const lookAndSaySequence = (iterations: number): number[] => {
  const sequence = [1]

  while (sequence.length < iterations) {
    const previousNumber = sequence[sequence.length - 1]
    const previousDigits = previousNumber.toString().split('')
    const newDigits: string[] = []

    let currentDigit = previousDigits[0]
    let currentDigitCount = 0
    for (let i = 0; i < previousDigits.length; i++) {
      currentDigitCount += 1
      const nextIndex = i + 1
      if (nextIndex === previousDigits.length || previousDigits[nextIndex] !== currentDigit) {
        newDigits.push(currentDigitCount.toString())
        newDigits.push(currentDigit)
        currentDigit = previousDigits[nextIndex]
        currentDigitCount = 0
      }
    }

    sequence.push(Number(newDigits.join('')))
  }

  return sequence
}

export default lookAndSaySequence
