import {
  GraphNode,
  traverse,
  AdjacencyNode,
  AdjacencyListGraph,
  AdjacencyMatrixGraph,
} from './graphs'

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

const makeAdjacencyGraph = <T>(graphType: 'matrix' | 'list') => {
  const graph = (graphType === 'matrix') ? new AdjacencyMatrixGraph<string>()
    : new AdjacencyListGraph<string>()
  const nodeA = new AdjacencyNode<string>('a')
  const nodeB = new AdjacencyNode<string>('b')
  const nodeC = new AdjacencyNode<string>('c')
  const nodeD = new AdjacencyNode<string>('d')
  const nodeE = new AdjacencyNode<string>('e')
  const nodeF = new AdjacencyNode<string>('f')
  const nodeG = new AdjacencyNode<string>('g')

  const nodes = [nodeA, nodeB, nodeC, nodeD, nodeE, nodeF, nodeG]
  nodes.forEach((node) => graph.addNode(node))
  graph.addEdge(nodeA, nodeB)
  graph.addEdge(nodeA, nodeC)
  graph.addEdge(nodeB, nodeD)
  graph.addEdge(nodeB, nodeE)
  graph.addEdge(nodeC, nodeD)
  graph.addEdge(nodeC, nodeF)
  graph.addEdge(nodeE, nodeG)
  graph.addEdge(nodeF, nodeG)

  return { graph, nodeC, nodeD }
}

describe('AdjacencyMatrixGraph', () => {
  it('stores graph edges using a matrix', () => {
    const { graph } = makeAdjacencyGraph('matrix')

    expect(graph.toJS()).toEqual([
      //     a   b   c   d   e   f   g
      /*a*/ [0,  1,  1,  0,  0,  0,  0],
      /*b*/ [1,  0,  0,  1,  1,  0,  0],
      /*c*/ [1,  0,  0,  1,  0,  1,  0],
      /*d*/ [0,  1,  1,  0,  0,  0,  0],
      /*e*/ [0,  1,  0,  0,  0,  0,  1],
      /*f*/ [0,  0,  1,  0,  0,  0,  1],
      /*g*/ [0,  0,  0,  0,  1,  1,  0],
    ])
  })

  describe('removeNode', () => {
    it('removes a node and its connections from the graph', () => {
      const { graph, nodeD } = makeAdjacencyGraph('matrix')

      graph.removeNode(nodeD)

      expect(graph.toJS()).toEqual([
        //     a   b   c   e   f   g
        /*a*/ [0,  1,  1,  0,  0,  0],
        /*b*/ [1,  0,  0,  1,  0,  0],
        /*c*/ [1,  0,  0,  0,  1,  0],
        /*e*/ [0,  1,  0,  0,  0,  1],
        /*f*/ [0,  0,  1,  0,  0,  1],
        /*g*/ [0,  0,  0,  1,  1,  0],
      ])
    })
  })

  describe('removeEdge', () => {
    it('removes an edge from between two nodes', () => {
      const { graph, nodeC, nodeD } = makeAdjacencyGraph('matrix')

      graph.removeEdge(nodeC, nodeD)

      expect(graph.toJS()).toEqual([
        //     a   b   c   d   e   f   g
        /*a*/ [0,  1,  1,  0,  0,  0,  0],
        /*b*/ [1,  0,  0,  1,  1,  0,  0],
        /*c*/ [1,  0,  0,  0,  0,  1,  0],
        /*d*/ [0,  1,  0,  0,  0,  0,  0],
        /*e*/ [0,  1,  0,  0,  0,  0,  1],
        /*f*/ [0,  0,  1,  0,  0,  0,  1],
        /*g*/ [0,  0,  0,  0,  1,  1,  0],
      ])
    })
  })
})

describe('AdjacencyListGraph', () => {
  it('stores a graph using lists', () => {
    const { graph } = makeAdjacencyGraph('list')

    expect(graph.toJS()).toEqual({
      a: ['b', 'c'],
      b: ['a', 'd', 'e'],
      c: ['a', 'd', 'f'],
      d: ['b', 'c'],
      e: ['b', 'g'],
      f: ['c', 'g'],
      g: ['e', 'f'],
    })
  })

  describe('removeNode', () => {
    it('removes a node and its connections from the graph', () => {
      const { graph, nodeD } = makeAdjacencyGraph('list')

      graph.removeNode(nodeD)

      expect(graph.toJS()).toEqual({
        a: ['b', 'c'],
        b: ['a', 'e'],
        c: ['a', 'f'],
        e: ['b', 'g'],
        f: ['c', 'g'],
        g: ['e', 'f'],
      })
    })
  })

  describe('removeEdge', () => {
    it('removes an edge from between two nodes', () => {
      const { graph, nodeC, nodeD } = makeAdjacencyGraph('list')

      graph.removeEdge(nodeC, nodeD)

      expect(graph.toJS()).toEqual({
        a: ['b', 'c'],
        b: ['a', 'd', 'e'],
        c: ['a', 'f'],
        d: ['b'],
        e: ['b', 'g'],
        f: ['c', 'g'],
        g: ['e', 'f'],
      })
    })
  })
})
