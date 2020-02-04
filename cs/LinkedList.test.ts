import LinkedList from './LinkedList'

describe('LinkedList', () => {
  const makeNumsList = () => {
    const list = new LinkedList<number>()
    const nums = [2, 4, 6, 8, 10, 12]
    nums.forEach((num) => {
      list.push(num)
    })
    return list
  }

  describe('push', () => {
    it('adds to the end of the array', () => {
      const list = new LinkedList<number>()

      list.push(1)
      list.push(2)
      list.push(3)

      expect(list.length).toBe(3)
    })
  })

  describe('get', () => {
    it('gets the element at the given index', () => {
      const list = new LinkedList<number>()

      list.push(1)
      expect(list.get(0)).toBe(1)

      list.push(2)
      expect(list.get(0)).toBe(1)
      expect(list.get(1)).toBe(2)

      list.push(3)
      expect(list.get(1)).toBe(2)
    })

    it('does not error out for a non-existent index', () => {
      const numsList = makeNumsList()

      expect(numsList.get(-1)).toBeUndefined()
      expect(numsList.get(numsList.length)).toBeUndefined()
    })

    it('does not error out for an empty list', () => {
      const emptyList = new LinkedList<number>()

      expect(emptyList.get(0)).toBeUndefined()
    })
  })

  describe('pop', () => {
    it('removes the element from the end of the array', () => {
      const list = makeNumsList()
      expect(list.length).toBe(6)

      const poppedEl = list.pop()
      expect(poppedEl).toBe(12)
      expect(list.length).toBe(5)
      expect(list.get(5)).toBeUndefined()

      const nextPoppedEl = list.pop()
      expect(nextPoppedEl).toBe(10)
    })

    it('does not error out for an empty list', () => {
      const emptyList = new LinkedList<number>()

      expect(emptyList.pop()).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('deletes the element from the given index', () => {
      const list = makeNumsList()

      list.delete(3)
      expect(list.length).toBe(5)
      expect(list.get(3)).toBe(10)
      expect(list.get(4)).toBe(12)
      expect(list.get(5)).toBeUndefined()

      list.delete(4)
      expect(list.pop()).toBe(10)

      list.delete(0)
      expect(list.get(0)).toBe(4)
    })

    it('does not error out for a non-existent index', () => {
      const numsList = makeNumsList()

      expect(() => numsList.delete(-1)).not.toThrow()
      expect(() => numsList.delete(numsList.length)).not.toThrow()
    })

    it('does not error out for an empty list', () => {
      const emptyList = new LinkedList<number>()

      emptyList.delete(0)

      expect(emptyList.get(0)).toBeUndefined()
    })

    it('does not error out for a list of length 1', () => {
      const list = new LinkedList<number>()
      list.push(2)

      list.delete(0)
      expect(list.get(0)).toBeUndefined()
      expect(list.length).toBe(0)
      expect(list.pop()).toBeUndefined()
    })
  })

  describe('shift()', () => {
    it('removes the element from the beginning of the list', () => {
      const list = makeNumsList()

      expect(list.shift()).toEqual(2)
      expect(list.length).toEqual(5)
      expect(list.shift()).toEqual(4)
      expect(list.length).toEqual(4)
    })

    it('does not error out for an empty list', () => {
      const emptyList = new LinkedList<number>()

      expect(emptyList.shift()).toBeUndefined()
      expect(emptyList.length).toEqual(0)
    })

    it('does not error out for a list of length 1', () => {
      const list = new LinkedList<number>()
      list.push(2)

      list.shift()
      expect(list.get(0)).toBeUndefined()
      expect(list.length).toBe(0)

      list.push(3)
      expect(list.shift()).toEqual(3)
    })
  })
})
