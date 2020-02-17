import { buyAndSellStocks, buyAndSellStocksEfficient } from './buyAndSellStocks'

describe('buyAndSellStocks()', () => {
  it('returns the day to buy and the day to sell to earn the most profit', () => {
    const result = buyAndSellStocks([7, 1, 5, 3, 6, 4])
    expect(result).toEqual([1, 4])
  })

  it('returns null if no possible profit', () => {
    const result = buyAndSellStocks([7, 6, 4, 3, 1])
    expect(result).toBeNull()
  })
})

describe('buyAndSellStocksEfficient()', () => {
  it('returns the day to buy and the day to sell to earn the most profit', () => {
    const result = buyAndSellStocksEfficient([7, 1, 5, 3, 6, 0, 4])
    expect(result).toEqual([1, 4])
  })

  it('returns null if no possible profit', () => {
    const result = buyAndSellStocksEfficient([7, 6, 4, 3, 1])
    expect(result).toBeNull()
  })
})
