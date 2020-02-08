import findMatchingNode from './findMatchingNode'

describe('findMatchingNode()', () => {
  const createDomTree = () => {
    const domTree = document.createElement('div')
    domTree.appendChild(document.createElement('div'))
    domTree.appendChild(document.createElement('div'))
    domTree.appendChild(document.createElement('div'))
    const level2Node = domTree.children[2]
    level2Node.appendChild(document.createElement('div'))
    level2Node.appendChild(document.createElement('div'))

    return domTree
  }

  it('given a node from one DOM tree, it finds the matching node in an identical tree', () => {
    const domTree1 = createDomTree()
    const domTree2 = createDomTree()
    const searchNode = domTree1.children[2].children[0]
    const expectedNode = domTree2.children[2].children[0]

    expect(findMatchingNode(searchNode, domTree2)).toEqual(expectedNode)
  })
})