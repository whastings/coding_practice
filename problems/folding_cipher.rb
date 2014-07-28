# Implement the Folding Cipher.
# It folds the alphabet in half and uses the adjacent letter.
# i.e. a <=> z, b <=> y, c <=> x, m <=> n.

def folding_cipher(string)
  alpha = ('a'..'z').to_a
  new_str = ''
  (0...string.length).each do |char_i|
    char_index = alpha.index(string[char_i])
    new_char_index = char_index + (25 - (char_index * 2))
    new_str << alpha[new_char_index]
  end
  new_str
end

p folding_cipher("thisisatest") # => "gsrhrhzgvhg"
