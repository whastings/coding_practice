def quicksort(array, start = 0, stop = array.length - 1)
  return unless start < stop
  pivot_index = rand(start..stop)
  pivot_index = partition(array, start, stop, pivot_index)
  quicksort(array, start, pivot_index - 1)
  quicksort(array, pivot_index + 1, stop)
end

def partition(array, start, stop, pivot_index)
  leq_bound, greater_bound = start, start
  pivot_value = array[pivot_index]
  array[stop], array[pivot_index] = pivot_value, array[stop]

  while greater_bound < stop
    if array[greater_bound] <= pivot_value
      array[leq_bound], array[greater_bound] =
        array[greater_bound], array[leq_bound]
      leq_bound += 1
    end
    greater_bound += 1
  end

  array[leq_bound], array[stop] = pivot_value, array[leq_bound]
  leq_bound
end

# Less-efficient, not-in-place version:
#def quicksort(array)
  #return array if array.length <= 1
  #pivot_index = rand(array.length - 1)
  #pivot = array[pivot_index]
  #array.delete_at(pivot_index)
  #lesser, greater = [], []
  #array.each { |el| el > pivot ? greater << el : lesser << el }
  #quicksort(lesser) + [pivot] + quicksort(greater)
#end

if __FILE__ == $PROGRAM_NAME
  array1 = [2, 3, 16, 8, 5, 19, 4, 2, 7]
  quicksort(array1)
  p array1

  array2 = [7, 6, 5, 4, 3, 2, 1, 0]
  quicksort(array2)
  p array2
end
