BRACKETS = {
  '{' => '}',
  '(' => ')',
  '[' => ']'
}

OPEN_PATTERN = /\A\{|\(|\[\z/
CLOSE_PATTERN = /\A\}|\)|\]\z/

def validate_brackets(string)
  stack = []
  string.chars.each do |char|
    if char =~ OPEN_PATTERN
      stack << char
    elsif char =~ CLOSE_PATTERN
      if stack.empty? || BRACKETS[stack.last] != char
        return false
      end
      stack.pop
    end
  end
  stack.empty?
end
