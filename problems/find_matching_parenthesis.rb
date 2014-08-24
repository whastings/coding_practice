def find_matching_parenthesis(string, start_pos)
  opens_found = 1
  (start_pos + 1...string.length).each do |index|
    if string[index] == '('
      opens_found += 1
    elsif string[index] == ')'
      opens_found -= 1
      return index if opens_found == 0
    end
  end
  -1
end
