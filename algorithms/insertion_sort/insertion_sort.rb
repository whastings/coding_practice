# Runtime: O(n^2)

def insertion_sort(array)
  (1...array.length).each do |index|
    element = array[index]
    prev_index = index - 1
    while (prev_index >= 0 && element < array[prev_index])
      array[prev_index + 1] = array[prev_index]
      prev_index -= 1
    end
    array[prev_index + 1] = element
  end
end

if __FILE__ == $PROGRAM_NAME
  array = [7, 3, 9, 7, 1, -4, 3, 3, 2, 0, -1]
  insertion_sort(array)
  p array
end
