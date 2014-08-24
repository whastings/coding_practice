def is_palindrome?(string)
  start_index, end_index = 0, string.length - 1
  while start_index <= end_index
    return false if string[start_index] != string[end_index]
    start_index += 1
    end_index -= 1
  end
  true
end
