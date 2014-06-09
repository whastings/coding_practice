require 'benchmark'

class BigOBenchmark
  REPEAT_NUM = 1000
  START_NUM = 100
  INCREASE_FACTOR = 2

  def initialize(runner, input_generator)
    self.current_num = START_NUM
    self.input_generator = input_generator
    self.runner = runner
    self.run_results = []
  end

  def run(iterations)
    iterations.times do
      input = self.input_generator.call(self.current_num)
      bm_times = Benchmark.measure do
        REPEAT_NUM.times { self.runner.call(input) }
      end
      puts bm_times.real / REPEAT_NUM
      self.current_num *= INCREASE_FACTOR
    end
  end

  protected

  attr_accessor :current_num, :input_generator, :runner, :run_results
end
