/**
 * Array List
 *
 * - In real implementations, directly manages allocated memory for array elements.
 * - Lookup is cheap
 * - Push is cheap
 * - Delete is expensive
 *   - You have to move everything after the spot you deleted back one.
 * - Insertion is expensive
 *   - You have to move everything after the insertion point forward one
 */

 class ArrayList<T> {
   private data: { [key: number]: T | undefined } = {}
   private _length: number = 0

   get length(): number {
     return this._length
   }

   delete(index: number): void {
     const { data, _length } = this
     for (let i = index; i < (_length - 1); i++) {
       data[i] = data[i + 1]
     }
     delete data[_length - 1]
     this._length -= 1
   }

   get(index: number): T | undefined {
     return this.data[index]
   }

   pop(): T | undefined {
     const el = this.data[this._length - 1]
     this.delete(this._length - 1)
     return el
   }

   push(element: T): void {
     this.data[this._length] = element
     this._length += 1
   }
 }

 export default ArrayList
