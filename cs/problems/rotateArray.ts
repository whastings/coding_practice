/**
 * Rotate Array
 *
 * Function that rotates the elements in an array by N places
 *
 * Source: https://repl.it/@bgando/rotate-array-prompt
 */

// new Array (6)
// loop through each element, index in array
//   compute new index
//   (currentIndex + rotationAmount) % array.length
//   copy element to new index in new array

export const rotateArray = <T>(array: T[], rotationAmount: number): T[] => {
  const newArray: T[] = new Array(array.length)
  array.forEach((element, i) => {
    const newIndex = (i + rotationAmount) % array.length
    newArray[newIndex] = element
  })
  return newArray
}

// loop from 1 to N
//   Save last element in variable
//   Move each element in array forward by 1
//   Place former last element on front of array

export const rotateArrayInPlace = <T>(array: T[], rotationAmount: number): T[] => {
  for (let rotationIteration = 1; rotationIteration <= rotationAmount; rotationIteration++) {
    const lastElement = array[array.length - 1]
    for (let i = (array.length - 1); i > 0; i--) {
      array[i] = array[i - 1]
    }
    array[0] = lastElement
  }
  return array
}
