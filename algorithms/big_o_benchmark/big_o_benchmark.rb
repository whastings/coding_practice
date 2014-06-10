require 'benchmark'

class BigOBenchmark
  REPEAT_NUM = 1000
  START_NUM = 100
  INCREASE_FACTOR = 2

  def render
    self.run_results.map.with_index do |result, index|
      rendered = result.render
      if index > 0
        rendered << ' - '
        rendered << compare_results(result, self.run_results[index - 1])
      end
      rendered
    end.join("\n")
  end

  def initialize(runner, input_generator)
    self.current_num = START_NUM
    self.input_generator = input_generator
    self.runner = runner
    self.run_results = []
  end

  def run(iterations)
    iterations.times do |i|
      input = self.input_generator.call(self.current_num)
      bm_times = Benchmark.measure do
        REPEAT_NUM.times { self.runner.call(input) }
      end
      average = bm_times.real / REPEAT_NUM
      self.run_results << BigOResult.new(average, i, self.current_num, input)
      self.current_num *= INCREASE_FACTOR
    end
  end

  protected

  attr_accessor :current_num, :input_generator, :runner, :run_results

  private

  def compare_results(current_result, previous_result)
    difference = current_result.compare_to(previous_result)
    difference = (difference * 100).round(4)
    comparison = (difference > 0) ? 'Increase' : 'Decrease'
    comparison << ": #{difference}%"
  end
end

class BigOResult
  attr_accessor :time, :input, :iteration, :num_inputs

  def compare_to(other_result)
    change = self.time - other_result.time
    change / other_result.time
  end

  def initialize(time, iteration, num_inputs, input)
    self.time, self.iteration, self.num_inputs, self.input =
      time, iteration, num_inputs, input
  end

  def render
    rendered_time = self.time.round(4)
    [
      "\##{self.iteration + 1}",
      "Time: #{rendered_time}",
      "Num Inputs: #{self.num_inputs}"
    ].join(' - ')
  end
end
