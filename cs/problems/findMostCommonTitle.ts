/**
 * Source: https://codepen.io/btholt/pen/KZYdKW
 */

import { GraphNode, traverse } from '../graphs'
import { GraphPerson } from '../testData/peopleGraph'

const findMostCommonTitle = (startPerson: GraphNode<GraphPerson>, degreesSeparation: number): string => {
  const titleCountsMap = new Map<string, number>()

  traverse(
    startPerson,
    (person) => {
      const titleCount = titleCountsMap.get(person.title) || 0
      titleCountsMap.set(person.title, titleCount + 1)
    },
    degreesSeparation,
  )

  let highestCount = 0
  let mostCommonTitle = ''
  for (let [title, count] of titleCountsMap.entries()) {
    if (count > highestCount) {
      mostCommonTitle = title
      highestCount = count
    }
  }

  return mostCommonTitle
}

export default findMostCommonTitle
