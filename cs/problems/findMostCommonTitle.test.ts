import findMostCommonTitle from './findMostCommonTitle'
import makePeopleGraph from '../testData/peopleGraph'

describe('findMostCommonTitle', () => {
  const peopleNodes = makePeopleGraph()

  it('calculates the most common title within a given degree of separation', () => {
    expect(findMostCommonTitle(peopleNodes[29], 2)).toEqual('Librarian')
    expect(findMostCommonTitle(peopleNodes[10], 3)).toEqual('Graphic Designer')
    expect(findMostCommonTitle(peopleNodes[305], 4)).toEqual('Environmental Tech')
    // expect(findMostCommonTitle(peopleNodes[0], 7)).toEqual('Geological Engineer')
  })
})
