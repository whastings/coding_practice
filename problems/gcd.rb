def gcd(int1, int2)
  big_int = int1 > int2 ? int1 : int2
  small_int = big_int == int1 ? int2 : int1
  return big_int if small_int == 0
  gcd(small_int, big_int % small_int)
end
