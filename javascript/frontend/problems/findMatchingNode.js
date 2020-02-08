const findMatchingNode = (searchNode, domTree2) => {
  const childrenIndexes = []

  let currentNode = searchNode
  while (currentNode.parentNode) {
    const { parentNode } = currentNode
    const currentNodeIndex = Array.from(parentNode.children).indexOf(currentNode)
    childrenIndexes.push(currentNodeIndex)
    currentNode = parentNode
  }

  return childrenIndexes.reverse().reduce((currentNode, currentIndex) => {
    return currentNode.children[currentIndex]
  }, domTree2)
}

export default findMatchingNode
