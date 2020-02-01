import range from './utils/range'

interface Pair<T> {
  key: string,
  value: T,
}

class StringHashTable<T> {
  private buckets: Array<Array<Pair<T>>> = range(1, 10).map(() => [])
  private countPairs = 0

  delete(key: string) {
    const bucket = this.getBucket(key)
    const pairIndex = bucket.findIndex((currentPair) => currentPair.key === key)

    if (pairIndex > -1) {
      bucket.splice(pairIndex, 1)
      this.countPairs -= 1
    }
  }

  get(key: string): T | undefined {
    const bucket = this.getBucket(key)
    return this.findPair(key, bucket)?.value
  }

  set(key: string, value: T): void {
    const bucket = this.getBucket(key)
    const pair = this.findPair(key, bucket)

    if (pair) {
      pair.value = value
    } else {
      bucket.push({ key, value })
      this.countPairs += 1
      this.resizeIfNeeded()
    }
  }

  private findPair(key: string, bucket: Pair<T>[]): Pair<T> | undefined {
    return bucket.find((currentPair) => currentPair.key === key)
  }

  private getBucket(key: string): Pair<T>[] {
    const bucketIndex = this.naiveStringHash(key) % this.buckets.length
    return this.buckets[bucketIndex]
  }

  private naiveStringHash(string: string): number {
    let sum = 0;

    for (let i = 0; i < string.length; i++) {
      sum += string.charCodeAt(i) * 3
    }

    return sum
  }

  private resizeIfNeeded(): void {
    if (this.countPairs >= (this.buckets.length / 2)) {
      const oldBuckets = this.buckets
      this.buckets = range(1, oldBuckets.length * 2).map(() => [])

      oldBuckets.forEach((oldBucket) => {
        oldBucket.forEach((pair) => {
          const newBucket = this.getBucket(pair.key)
          newBucket.push(pair)
        })
      })
    }
  }
}

export default StringHashTable
