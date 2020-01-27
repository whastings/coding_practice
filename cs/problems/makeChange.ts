export const makeChange = (coins: number[], amount: number): number[] => {
  const sortedCoins = coins.slice().sort((coin1, coin2) => coin2 - coin1)
  // Example of Dynamic Programming
  const cache = new Map<number, number[]>()

  const findLeastCoins = (currentAmount: number) => {
    const cachedCoins = cache.get(currentAmount)
    if (cachedCoins) {
      return cachedCoins
    }

    let currentLeastCoins: number[] = []

    sortedCoins.forEach((currentCoin) => {
      if (currentCoin <= currentAmount) {
        const candidateCoins = [
          currentCoin,
          ...findLeastCoins(currentAmount - currentCoin)
        ]
        if (!currentLeastCoins.length || candidateCoins.length < currentLeastCoins.length) {
          currentLeastCoins = candidateCoins
        }
      }
    })

    cache.set(currentAmount, currentLeastCoins)
    return currentLeastCoins
  }

  return findLeastCoins(amount)
}

export const makeChangeGreedy = (coins: number[], amount: number): number[] => {
  const sortedCoins = coins.slice().sort((num1, num2) => num2 - num1)
  const usedCoins = []
  let coinsSum = 0
  let currentCoinIndex = 0

  while (coinsSum < amount) {
    const currentCoin = sortedCoins[currentCoinIndex]
    if ((coinsSum + currentCoin) <= amount) {
      coinsSum += currentCoin
      usedCoins.push(currentCoin)
    } else {
      currentCoinIndex += 1
    }
  }

  return usedCoins
}
