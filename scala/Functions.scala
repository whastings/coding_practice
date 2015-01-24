object Functions extends App {
  def factorial(num: Int): Int = {
    if (num == 1) 1 else num * factorial(num - 1)
  }
  println("Factorial: " + factorial(5))

  def fib(amount: Int): Array[Int] = {
    if (amount <= 2) {
      Array(0, 1).take(amount)
    } else {
      val prevFibs = fib(amount - 1)
      prevFibs :+ prevFibs.takeRight(2).reduceLeft(_ + _)
    }
  }
  println("Fibs: " + fib(5).mkString(", "))

  // TODO: transpose array
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
  ).map(_.mkString(", ")).mkString("\n"))

  // TODO: Stock picker

  // TODO: Caesar Cipher
}
