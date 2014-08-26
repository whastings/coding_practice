def array_permutations(array)
  return [[]] if array.empty?
  permutations = []

  array.each_index do |index|
    current_el = array[index]
    other_els = array[0...index] + array[index + 1..-1]
    sub_perms = array_permutations(other_els)

    permutations.concat(sub_perms.map { |perm| perm.unshift(current_el) })
  end

  permutations
end
