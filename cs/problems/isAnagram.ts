export const isAnagram = (sourceString: string, testString: string): boolean => {
  const makeFrequencyMap = (string: string) => {
    const map = new Map<string, number>()
    for (let char of string) {
      const currentCount = map.get(char) || 0
      map.set(char, currentCount + 1)
    }
    return map
  }

  if (sourceString.length !== testString.length) {
    return false
  }

  const sourceMap = makeFrequencyMap(sourceString)
  const testMap = makeFrequencyMap(testString)

  for (let [char, count] of testMap.entries()) {
    if (!sourceMap.has(char) || sourceMap.get(char) !== count) {
      return false
    }
  }

  return true
}

export const isAnagramSpaceEfficient = (sourceString: string, testString: string): boolean => {
  if (sourceString.length !== testString.length) {
    return false
  }

  const frequencyMap = new Map<string, number>()

  for (let i = 0; i < sourceString.length; i++) {
    const sourceChar = sourceString[i]
    const testChar = testString[i]
    frequencyMap.set(sourceChar, (frequencyMap.get(sourceChar) || 0) + 1)
    frequencyMap.set(testChar, (frequencyMap.get(testChar) || 0) - 1)
  }

  for (let count of frequencyMap.values()) {
    if (count !== 0) {
      return false
    }
  }

  return true
}
