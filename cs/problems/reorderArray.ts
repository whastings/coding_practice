const reorderArray = (array: any[], newIndexes: number[]): void => {
  const swap = (array: any[], index1: number, index2: number) => {
    const currentElement = array[index1]
    array[index1] = array[index2]
    array[index2] = currentElement
  }

  let swapped
  do {
    swapped = false
    for (let i = 0; i < array.length; i++) {
      const newIndex = newIndexes[i]
      if (newIndex !== i) {
        swap(array, i, newIndex)
        swap(newIndexes, i, newIndex)
        swapped = true
      }
    }
  } while (swapped)
}

export default reorderArray
