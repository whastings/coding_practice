def is_palindrome?(string)
  start_index, end_index = 0, string.length - 1
  while start_index <= end_index
    return false if string[start_index] != string[end_index]
    start_index += 1
    end_index -= 1
  end
  true
end

def is_palindrome_rec?(string)
  return true if string.length <= 1
  return false if string[0] != string[-1]
  is_palindrome_rec?(string[1...-1])
end
