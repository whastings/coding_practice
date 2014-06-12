require './big_o_benchmark'
require '../binary_search/binary_search'
require '../bubble_sort/bubble_sort'
require '../merge_sort/merge_sort'
require '../quicksort/quicksort'

sort_input = -> (num) do
  (0..1_000_000).to_a.sample(num)
end


puts "Merge Sort - O(nlogn)"

ms_run = -> (input) do
  merge_sort(input)
end

ms_bm = BigOBenchmark.new(ms_run, sort_input)
ms_bm.run(3)
puts ms_bm.render


puts "Quick Sort - O(nlogn)"

qsort_run = -> (input) do
  quicksort(input)
end

qsort_bm = BigOBenchmark.new(qsort_run, sort_input)
qsort_bm.run(3)
puts qsort_bm.render


puts "Bubble Sort - O(n^2)"

bsort_run = -> (input) do
  bubble_sort(input)
end

bsort_bm = BigOBenchmark.new(bsort_run, sort_input)
bsort_bm.run(3)
puts bsort_bm.render


puts "Binary Search - O(logn)"

bsearch_input = -> (num) do
  elements = (0..1_000_000).to_a.sample(num)
  search_target = elements.sample
  [elements, search_target]
end

bsearch_run = -> (input) do
  binary_search(input.first, input.last)
end

bsearch_bm = BigOBenchmark.new(bsearch_run, bsearch_input)
bsearch_bm.run(3)
puts bsearch_bm.render
