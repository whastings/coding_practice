def permutation_palindrome?(string)
  char_counts = Hash.new(0)
  string.chars.each do |char|
    char_counts[char] += 1
  end

  odd_counts = char_counts.values.count { |count| count.odd? }

  if string.length.odd?
    odd_counts == 1
  else
    odd_counts == 0
  end
end
