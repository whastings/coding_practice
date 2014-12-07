# Runtime: O(n^2)

def selection_sort(array)
  array.each_with_index do |el, start_index|
    min_value, min_index = el, start_index
    (start_index + 1...array.length).each do |next_index|
      next_value = array[next_index]
      next unless next_value < min_value
      min_value, min_index = next_value, next_index
    end
    array[start_index], array[min_index] = min_value, el
  end
end

if __FILE__ == $PROGRAM_NAME
  array = [7, 2, 6, 4, 0, 4, 3, -5, 9, 1, -2]
  selection_sort(array)
  p array
end
