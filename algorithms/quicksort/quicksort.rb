def quicksort(array)
  return array if array.length <= 1
  pivot_index = rand(array.length - 1)
  pivot = array[pivot_index]
  array.delete_at(pivot_index)
  lesser, greater = [], []
  array.each { |el| el > pivot ? greater << el : lesser << el }
  quicksort(lesser) + [pivot] + quicksort(greater)
end

if __FILE__ == $PROGRAM_NAME
  p quicksort([2, 3, 16, 8, 5, 19, 4, 2, 7])
  p quicksort([7, 6, 5, 4, 3, 2, 1, 0])
end
