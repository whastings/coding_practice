require_relative './is_palindrome'

def longest_palindrome(string)
  longest = ''
  (0...string.length).each do |start_index|
    (start_index + longest.length...string.length).each do |end_index|
      sub = string[start_index..end_index]
      next unless is_palindrome?(sub)
      longest = sub if sub.length > longest.length
    end
  end
  longest
end
