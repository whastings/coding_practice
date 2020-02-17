/**
 * Buy and Sell Stocks
 *
 * Source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 */

// loop through pricesByDays
//   loop through pricesByDays after current price/day
//   If second price/day - first price/day > current max profit
//   current max profit = current profit
//   result = [i, j]

// Time complexity: O(n^2)
export const buyAndSellStocks = (pricesByDays: number[]): [number, number] | null => {
  let buyAndSellDays: [number, number] | null = null
  let currentMaxProfit = 0

  for (let buyDayIndex = 0; buyDayIndex < (pricesByDays.length - 1); buyDayIndex++) {
    for (let sellDayIndex = (buyDayIndex + 1); sellDayIndex < pricesByDays.length; sellDayIndex++) {
      const currentProfit = pricesByDays[sellDayIndex] - pricesByDays[buyDayIndex]
      if (currentProfit > currentMaxProfit) {
        buyAndSellDays = [buyDayIndex, sellDayIndex]
        currentMaxProfit = currentProfit
      }
    }
  }

  return buyAndSellDays
}

// loop through pricesByDays
//   Keep track of minimum price/day
//   Keep track of max profit
//   Keep track of sell day
//   If current profit > current max profit
//     current max profit = current profit
//     current sell day = current day
//   If current day price < min price
//     min price/day = current day/price

// Time complexity: O(n)
export const buyAndSellStocksEfficient = (pricesByDays: number[]): [number, number] | null => {
  let buyDay
  let sellDay
  let currentMinDay = 0
  let currentMaxProfit = 0

  for (let currentDay = 1; currentDay < pricesByDays.length; currentDay++) {
    const currentProfit = pricesByDays[currentDay] - pricesByDays[currentMinDay]
    if (currentProfit < 0) {
      currentMinDay = currentDay
    } else if (currentProfit > currentMaxProfit) {
      buyDay = currentMinDay
      sellDay = currentDay
      currentMaxProfit = currentProfit
    }
  }

  return (buyDay && sellDay) ? [buyDay, sellDay] : null
}
