class TwoStackQueue
  def dequeue
    self.fill_out_stack if self.out_stack.empty?
    out_stack.pop
  end

  def enqueue(item)
    self.in_stack << item
  end

  def initialize
    @in_stack = []
    @out_stack = []
  end

  protected

  attr_reader :in_stack, :out_stack

  def fill_out_stack
    self.in_stack.length.times do
      self.out_stack << self.in_stack.pop
    end
  end
end
