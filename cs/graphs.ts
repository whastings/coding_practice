import Queue from './Queue'

export class GraphNode<T> {
  constructor(
    public value: T,
    public edges: GraphNode<T>[] = [],
  ) {}
}

export class AdjacencyNode<T> {
  constructor(
    public value: T,
  ) {}
}

/**
 * Adjacency Matrix Graph
 *
 * - Stores relationships between vertices using a matrix (2D array)
 *   - Each element in 2D array represents whether two vertices are connected
 *         node1 node2 node3
 *   node1   0     1     0
 *   node2   1     0     1
 *   node3   0     1     0
 *   (node1 connects to node2; node2 connects to node3)
 * - Pros:
 *   - Supports matrix mathematical operations
 *   - More space and time complexity than Adjacency List
 */
export class AdjacencyMatrixGraph<T> {
  private nodeList: AdjacencyNode<T>[] = []
  private edgeLists: number[][] = []

  addNode(node: AdjacencyNode<T>): void {
    this.nodeList.push(node)

    this.edgeLists.forEach((edgeList) => {
      edgeList.push(0)
    })

    const newEdgeList: number[] = []
    this.nodeList.forEach(() => newEdgeList.push(0))
    this.edgeLists.push(newEdgeList)
  }

  addEdge(node1: AdjacencyNode<T>, node2: AdjacencyNode<T>): void {
    const index1 = this.nodeList.indexOf(node1)
    const index2 = this.nodeList.indexOf(node2)

    this.edgeLists[index1][index2] = 1
    this.edgeLists[index2][index1] = 1
  }

  removeNode(node: AdjacencyNode<T>): void {
    const nodeIndex = this.nodeList.indexOf(node)

    this.nodeList.splice(nodeIndex, 1)
    this.edgeLists.splice(nodeIndex, 1)
    this.edgeLists.forEach((edges) => {
      edges.splice(nodeIndex, 1)
    })
  }

  removeEdge(node1: AdjacencyNode<T>, node2: AdjacencyNode<T>): void {
    const index1 = this.nodeList.indexOf(node1)
    const index2 = this.nodeList.indexOf(node2)

    this.edgeLists[index1][index2] = 0
    this.edgeLists[index2][index1] = 0
  }

  toArray(): number[][] {
    return this.edgeLists
  }
}

export const traverse = <T>(
  startNode: GraphNode<T>,
  operationFn: (value: T) => void,
  degreesSeparation: number = Infinity,
): void => {
  const queue = new Queue<GraphNode<T>[]>()
  queue.enqueue([startNode])

  const visitedNodes = new Set<GraphNode<T>>()
  let currentDegreesSeparation = 0

  while (queue.length > 0 && currentDegreesSeparation <= degreesSeparation) {
    const currentDegreeNodes = queue.dequeue()!
    const nextDegreeNodes: GraphNode<T>[] = []

    currentDegreeNodes.forEach((nextNode) => {
      if (visitedNodes.has(nextNode)) {
        return
      }

      operationFn(nextNode.value)
      visitedNodes.add(nextNode)
      nextNode.edges.forEach((node) => nextDegreeNodes.push(node))
    })

    if (nextDegreeNodes.length) {
      queue.enqueue(nextDegreeNodes)
    }
    currentDegreesSeparation += 1
  }
}
