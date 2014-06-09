def binary_search(array, target)
  if array.empty? || (array.length == 1 && array.first != target)
    return nil
  end
  midpoint = array.length / 2
  return midpoint if array[midpoint] == target

  if target < array[midpoint]
    binary_search(array.take(midpoint), target)
  end

  result = binary_search(array.drop(midpoint + 1), target)
  result.nil? ? nil : result + midpoint + 1
end

if __FILE__ == $PROGRAM_NAME
  puts binary_search([1, 4, 7, 8, 11, 13, 19], 13) # Should be 5.
end
