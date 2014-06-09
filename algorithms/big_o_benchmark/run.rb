require './big_o_benchmark'
require '../merge_sort/merge_sort'

ms_run = -> (input) do
  merge_sort(input)
end

ms_input = -> (num) do
  (0..1_000_000).to_a.sample(num)
end

ms_bm = BigOBenchmark.new(ms_run, ms_input)
ms_bm.run(3)
