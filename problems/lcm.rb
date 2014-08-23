require_relative './gcd'

def lcm(big_int, small_int)
  (big_int * small_int) / gcd(big_int, small_int)
end
