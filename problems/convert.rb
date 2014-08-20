# Write a method that converts a number from base 10 to another base.
#
# Constraints:
# * Only support bases from 2 to 16

DIGITS = (0..9).map(&:to_s) + ('A'..'F').to_a

def convert(decimal_num, base)
  result = []
  while decimal_num > 0
    result << DIGITS[decimal_num % base]
    decimal_num /= base
  end
  result.reverse.join
end
