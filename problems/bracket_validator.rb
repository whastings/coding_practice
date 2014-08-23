BRACKETS = [
  ['{', '}'],
  ['(', ')'],
  ['[', ']']
]

def validate_brackets(string)
  BRACKETS.each do |pair|
    return false unless validate_bracket(*pair, string)
  end
  true
end

def validate_bracket(start_bracket, end_bracket, string)
  stack = []
  string.chars.each do |char|
    if char == start_bracket
      stack << start_bracket
    elsif char == end_bracket
      return false if stack.empty?
      stack.pop
    end
  end
  stack.empty?
end
