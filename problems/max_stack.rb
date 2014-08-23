class MaxStack
  def initialize
    @stack = []
  end

  def largest
    item = self.stack[self.stack.last[1]]
    item.first
  end

  def pop
    self.stack.pop.first
  end

  def push(el)
    max_el = self.stack.length > 0 ? self.stack.last[1] : nil
    current_max = (!max_el || el > self.stack[max_el].first) ?
      self.stack.length : max_el
    self.stack << [el, current_max]
    self
  end

  protected

  attr_reader :stack
end
