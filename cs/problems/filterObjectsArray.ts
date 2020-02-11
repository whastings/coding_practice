interface DictObject {
  [prop: string]: any,
}

const filterObjectsArray = (objects: DictObject[], filterPatterns: DictObject[]): DictObject[] => {
  const patternsMap = filterPatterns.reduce((map, pattern) => {
    const key = Object.keys(pattern)[0]
    const value = pattern[key]
    map.set(key, value)
    return map
  }, new Map<string, any>())

  return objects.filter((object) => {
    for (let [key, value] of Object.entries(object)) {
      if (patternsMap.has(key) && patternsMap.get(key) === value) {
        return false
      }
    }
    return true
  })
}

export default filterObjectsArray
