/**
 * Trie
 *
 * A tree for searching for values by prefix
 *
 * - Root node has no value
 * - Root node's children are nodes with first letters of all stored words
 * - Each first letter node has children for all second letters from that first letter
 * - And so on
 * - Optimized for lookup speed
 *   - You can do depth-first traversal following start of string to complete
 * - Very good for autocompletes
 * - Advanced versions have:
 *   - Support for completing from middle of word (not just beginning)
 *   - Weights for words so you can return certain words first
 *
 * - Resources:
 *   - https://btholt.github.io/four-semesters-of-cs-part-two/tries
 */

class TrieNode {
  private children = new Map<String, TrieNode>()

  constructor(
    public character: string,
    public isEndOfWord: boolean = false,
  ) {}

  // Find child that matches first character of string or create it
  // If more characters remaining
  //   Remove first character from string
  //   Pass rest of string to first letter child to add
  // Else
  //   Mark child node as end of word
  add(string: string) {
    const firstChar = string.charAt(0)
    let matchingChildNode = this.children.get(firstChar)

    if (!matchingChildNode) {
      matchingChildNode = new TrieNode(firstChar)
      this.children.set(firstChar, matchingChildNode)
    }

    const remainingString = string.slice(1)
    if (remainingString.length) {
      matchingChildNode.add(remainingString)
    } else {
      matchingChildNode.isEndOfWord = true
    }
  }

  getChild(char: string): TrieNode | undefined {
    return this.children.get(char)
  }

  // Loop over entries in children map
  //   For each child, DFS
  getChildrenStrings(): string[] {
    const { character } = this
    const childStrings: string[] = []

    if (this.isEndOfWord) {
      childStrings.push(character)
    }

    for (let childNode of this.children.values()) {
      const childNodeStrings = childNode.getChildrenStrings()
      childNodeStrings.forEach((string) => childStrings.push(character + string))
    }

    return childStrings
  }
}

class Trie {
  rootNode = new TrieNode('', false)

  add(word: string) {
    this.rootNode.add(word.toLowerCase())
  }

  // Split prefix into character array
  // Loop over array and get nodes matching each character
  // With node for end of prefix, get all children
  getCompletions(prefix: string): string[] {
    const prefixChars = prefix.toLowerCase().split('')
    const startNode = prefixChars.reduce((nextNode, nextChar) => {
      return nextNode && nextNode.getChild(nextChar)
    }, this.rootNode as (TrieNode | undefined))

    if (!startNode) {
      return []
    }

    const childrenStrings = startNode.getChildrenStrings()
    const wordsPrefix = prefix.slice(0, -1)
    return childrenStrings.map((string) => wordsPrefix + string)
  }
}

export default Trie
