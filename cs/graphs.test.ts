import { GraphNode, traverse } from './graphs'

describe('traverse()', () => {
  const makeGraph = () => {
    const nodeA = new GraphNode<string>('a')
    const nodeB = new GraphNode<string>('b')
    const nodeC = new GraphNode<string>('c')
    const nodeD = new GraphNode<string>('d')
    const nodeE = new GraphNode<string>('e')
    const nodeF = new GraphNode<string>('f')
    const nodeG = new GraphNode<string>('g')

    nodeA.edges = [nodeB, nodeC]
    nodeB.edges = [nodeD, nodeE]
    nodeC.edges = [nodeD, nodeF]
    nodeE.edges = [nodeG]
    nodeF.edges = [nodeG]

    return nodeA
  }

  it('visits all nodes in a graph', () => {
    const startNode = makeGraph()

    const result: string[] = []
    traverse(startNode, (value) => {
      result.push(value)
    })

    expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
  })

  it('visits a subset of nodes when degrees of separation are passed', () => {
    const startNode = makeGraph()

    const result: string[] = []
    traverse(startNode, (value) => {
      result.push(value)
    }, 2)

    expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
  })
})