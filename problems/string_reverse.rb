# O(n) version.
def reverse_string(string)
  start_index, end_index = 0, string.length - 1
  until start_index >= end_index
    string[start_index], string[end_index] =
      string[end_index], string[start_index]
    start_index += 1
    end_index -= 1
  end
  nil
end

# O(n^2) version
=begin
def reverse_string(string)
  end_index = string.length - 1
  string.length.times do
    (0...end_index).each do |index|
      string[index], string[index + 1] = string[index + 1], string[index]
    end
    end_index -= 1
  end
  nil
end
=end
