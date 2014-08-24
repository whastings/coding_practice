def digital_root(num)
  digits = []
  current_num = num
  while current_num > 0
    digits << current_num % 10
    current_num /= 10
  end
  sum = digits.inject(0) { |total, digit| total + digit }
  sum < 10 ? sum : digital_root(sum)
end
