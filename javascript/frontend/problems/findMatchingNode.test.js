import { findMatchingNode, findMatchingNodes } from './findMatchingNode'

const createDomTree = () => {
  const domTree = document.createElement('div')
  domTree.appendChild(document.createElement('div'))
  domTree.appendChild(document.createElement('div'))
  domTree.appendChild(document.createElement('div'))
  const level2Node = domTree.children[2]
  level2Node.appendChild(document.createElement('div'))
  level2Node.appendChild(document.createElement('div'))
  const level3Node = level2Node.children[1]
  level3Node.appendChild(document.createElement('div'))

  return domTree
}

describe('findMatchingNode()', () => {
  it('given a node from one DOM tree, it finds the matching node in an identical tree', () => {
    const domTree1 = createDomTree()
    const domTree2 = createDomTree()
    const searchNode = domTree1.lastChild.firstChild
    const expectedNode = domTree2.lastChild.firstChild

    expect(findMatchingNode(searchNode, domTree2)).toEqual(expectedNode)
  })
})

describe('findMatchingNodes()', () => {
  it('takes an array of nodes in one DOM tree and finds the matching nodes in another tree', () => {
    const domTree1 = createDomTree()
    const domTree2 = createDomTree()
    const searchNode1 = domTree1.children[1]
    const searchNode2 = domTree1.lastChild.firstChild
    const searchNode3 = domTree1.lastChild.lastChild.firstChild
    const expectedNode1 = domTree2.children[1]
    const expectedNode2 = domTree2.lastChild.firstChild
    const expectedNode3 = domTree2.lastChild.lastChild.firstChild

    expect(
      findMatchingNodes([searchNode1, searchNode2, searchNode3], domTree2)
    ).toEqual([expectedNode1, expectedNode2, expectedNode3])
  })
})
