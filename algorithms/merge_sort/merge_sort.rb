def merge_sort(array)
  return array if array.length <= 1
  midpoint = array.length / 2
  left_half = array.take(midpoint)
  right_half = array.drop(midpoint)
  merge(merge_sort(left_half), merge_sort(right_half))
end

def merge(left_half, right_half)
  result = []
  until left_half.empty? || right_half.empty?
    result << ((left_half.first < right_half.first) ?
      left_half.shift : right_half.shift)
  end
  result + left_half + right_half
end

if __FILE__ == $PROGRAM_NAME
  p merge_sort([5, 3, 2, 19, 15, 25, 7, 9])
end
