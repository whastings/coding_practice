class LinkedListNode
  attr_accessor :next, :previous, :value

  def initialize(value, prev_node = nil, next_node = nil)
    self.next, self.previous, self.value = next_node, prev_node, value
  end
end
