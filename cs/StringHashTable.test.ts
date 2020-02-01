import StringHashTable from './StringHashTable'
import range from './utils/range'

describe('StringHashTable', () => {
  describe('setting and getting', () => {
    it('supports setting and getting key/value pairs', () => {
      const hashTable = new StringHashTable<number>()
      expect(hashTable.get('foo')).toBeUndefined()

      hashTable.set('foo', 10)
      expect(hashTable.get('foo')).toEqual(10)

      hashTable.set('bar', 20)
      expect(hashTable.get('bar')).toEqual(20)
    })

    it('supports overwriting an existing key', () => {
      const hashTable = new StringHashTable<number>()

      hashTable.set('bar', 20)
      expect(hashTable.get('bar')).toEqual(20)

      hashTable.set('bar', 30)
      expect(hashTable.get('bar')).toEqual(30)
    })

    it('can handle many pairs', () => {
      const hashTable = new StringHashTable<number>()
      const nums = range(1, 100)

      nums.forEach((num) => hashTable.set(num.toString(), num))
      nums.forEach((num) => {
        expect(hashTable.get(num.toString())).toEqual(num)
      })
    })
  })

  describe('deleting', () => {
    it('supports deleting a key/value pair', () => {
      const hashTable = new StringHashTable<number>()
      hashTable.set('foo', 10)

      hashTable.delete('foo')

      expect(hashTable.get('foo')).toBeUndefined()
    })

    it('does not error for a non-existent key', () => {
      const hashTable = new StringHashTable<number>()
      hashTable.set('foo', 10)

      expect(() => hashTable.delete('bar')).not.toThrow()
    })
  })
})
