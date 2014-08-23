def is_prime?(num)
  return false if num <= 1
  return true if num == 2
  return false if num.even?
  square_root = Math.sqrt(num)
  (3..square_root).each do |divisor|
    return false if num % divisor == 0
  end
  true
end
