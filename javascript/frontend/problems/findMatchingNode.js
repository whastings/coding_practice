export const findMatchingNode = (searchNode, domTree2) => {
  const childrenIndexes = []

  let currentNode = searchNode
  while (currentNode.parentNode) {
    const { parentNode } = currentNode
    const currentNodeIndex = Array.from(parentNode.children).indexOf(currentNode)
    childrenIndexes.push(currentNodeIndex)
    currentNode = parentNode
  }

  return childrenIndexes.reduceRight((currentNode, currentIndex) => {
    return currentNode.children[currentIndex]
  }, domTree2)
}

export const findMatchingNodes = (searchNodes, domTree2) => {
  const nodeDepths = searchNodes.map((searchNode) => {
    let depth = 0
    let currentNode = searchNode
    while (currentNode.parentNode) {
      depth += 1
      currentNode = currentNode.parentNode
    }
    return { depth, node: searchNode }
  })
  const deepestNode = nodeDepths
    .sort((depth1, depth2) => depth1.depth - depth2.depth)
    .pop()
    .node

  const nodePathsMap = searchNodes.reduce((map, searchNode) => {
    map.set(searchNode, [])
    return map
  }, new Map())

  let currentNode = deepestNode
  while (currentNode.parentNode) {
    const { parentNode } = currentNode
    parentNode.childNodes.forEach((node, i) => {
      if (nodePathsMap.has(node)) {
        nodePathsMap.get(node).push(i)
      }
    })
    currentNode = parentNode
  }

  return searchNodes.map((searchNode) => {
    const nodePath = nodePathsMap.get(searchNode)
    return nodePath.reduceRight((tree2Node, index) => {
      return tree2Node.children[index]
    }, domTree2)
  })
}
