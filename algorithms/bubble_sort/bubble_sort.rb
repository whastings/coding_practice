def bubble_sort(array)
  last_index = array.length - 2
  loop do
    sorted = true
    (0..last_index).each do |index|
      next unless array[index] > array[index + 1]
      array[index], array[index + 1] = array[index + 1], array[index]
      sorted = false
    end
    last_index -= 1
    break if sorted
  end
end

if __FILE__ == $PROGRAM_NAME
  array1 = [2, 3, 16, 8, 5, 19, 4, 2, 7]
  bubble_sort(array1)
  p array1

  array2 = [7, 6, 5, 4, 3, 2, 1, 0]
  bubble_sort(array2)
  p array2
end
