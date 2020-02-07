import Stack from '../Stack'

export const flatten = (array: any[]): any[] => {
  return array.reduce((flatArray, nextEl) => {
    const flatEl = Array.isArray(nextEl) ? flatten(nextEl) : nextEl
    return flatArray.concat(flatEl)
  }, [])
}

export const flattenIterative = (array: any[]): any[] => {
  const flatArray: any[] = []
  const nextElements = new Stack<any>()
  array.forEach((element) => nextElements.push(element))

  while (nextElements.length > 0) {
    const nextElement = nextElements.pop()
    if (Array.isArray(nextElement)) {
      nextElement.forEach((element) => nextElements.push(element))
    } else {
      flatArray.push(nextElement)
    }
  }

  return flatArray.reverse()
}