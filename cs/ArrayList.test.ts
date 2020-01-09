import ArrayList from './ArrayList'

describe('ArrayList', () => {
  describe('push', () => {
    it('adds to the end of the array', () => {
      const list = new ArrayList<number>()

      list.push(1)
      list.push(2)
      list.push(3)

      expect(list.length).toBe(3)
    })
  })

  describe('get', () => {
    it('gets the element at the given index', () => {
      const list = new ArrayList<number>()

      list.push(1)
      expect(list.get(0)).toBe(1)

      list.push(2)
      expect(list.get(0)).toBe(1)
      expect(list.get(1)).toBe(2)
    })
  })

  describe('pop', () => {
    it('removes the element from the end of the array', () => {
      const list = new ArrayList<number>()
      const nums = [2, 4, 6, 8, 10, 12]
      nums.forEach((num) => {
        list.push(num)
      })
      expect(list.length).toBe(6)

      const poppedEl = list.pop()
      expect(poppedEl).toBe(12)
      expect(list.length).toBe(5)
      expect(list.get(5)).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('deletes the element from the given index', () => {
      const list = new ArrayList<number>()
      const nums = [2, 4, 6, 8, 10, 12]
      nums.forEach((num) => {
        list.push(num)
      })

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
  })
})
