import Queue from './Queue'

export class GraphNode<T> {
  constructor(
    public value: T,
    public edges: GraphNode<T>[] = [],
  ) {}
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
      operationFn(nextNode.value)
      nextNode.edges.forEach((node) => {
        if (!visitedNodes.has(node)) {
          visitedNodes.add(node)
          nextDegreeNodes.push(node)
        }
      })
    })

    if (nextDegreeNodes.length) {
      queue.enqueue(nextDegreeNodes)
    }
    currentDegreesSeparation += 1
  }
}
