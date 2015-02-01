object Functions extends App {
  def factorial(num: Int): Int = {
    if (num == 1) 1 else num * factorial(num - 1)
  }
  println("Factorial: " + factorial(5) + "\n")

  def fib(amount: Int): Array[Int] = {
    if (amount <= 2) {
      Array(0, 1).take(amount)
    } else {
      val prevFibs = fib(amount - 1)
      prevFibs :+ prevFibs.takeRight(2).reduceLeft(_ + _)
    }
  }
  println("Fibs: " + fib(5).mkString(", ") + "\n")

  def transpose(array: Array[Array[Int]]) = {
    val transposed = new Array[Array[Int]](array.length)
    for (col <- 0 until array.length) {
      transposed(col) = (for (row <- 0 until array.length) yield array(row)(col)).toArray
    }
    transposed
  }
  println("Transpose: \n" + transpose(
    Array(
      Array(1, 2, 3),
      Array(4, 5, 6),
      Array(7, 8, 9)
    )
  ).map(_.mkString(", ")).mkString("\n") + "\n")

  def stockPicker(prices: Array[Int]) = {
    (0 until prices.length - 1)
      .foldLeft((-1, -1, Double.NegativeInfinity)) { (currentBest, startIndex) =>
        val startPrice = prices(startIndex)
        val endIndex = ((startIndex + 1) until prices.length)
          .reduceLeft { (bestEnd, nextEnd) =>
            if (prices(nextEnd) - startPrice > prices(bestEnd) - startPrice)
              nextEnd else bestEnd
          }
        val possibleBestPrice = prices(endIndex) - startPrice
        if (possibleBestPrice > currentBest._3)
          (startIndex, endIndex, possibleBestPrice) else currentBest
      }
  }
  println("Stock Picker: " + stockPicker(Array(23, 56, 100, 12, 35, 79, 44, 90)))
  println

  def caesarCipher(text: String, shift: Int) = {
    text.map { (letter) =>
      if (letter.isLetter) {
        val startCode = if (letter.isUpper) 65 else 97
        ((letter.toInt - startCode + shift) % 26 + startCode).toChar
      } else {
        letter
      }
    }
  }
  println("Caesar Cipher: " + caesarCipher("Hello Worldz!", 3))

  // TODO: Bubble Sort

  // TODO: Substrings

  // TODO: Binary Search

  // TODO: Make change
}
