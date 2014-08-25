class SingleLinkNode
  attr_accessor :value, :next

  def initialize(value)
    self.value = value
  end
end

# Runner version.
def contains_cycle?(start_node)
  slow_runner, fast_runner = start_node, start_node

  until fast_runner.nil?
    slow_runner = slow_runner.next
    2.times { fast_runner = fast_runner.next }
    return true if slow_runner == fast_runner
  end

  false
end

# Hash version.
=begin
def contains_cycle?(start_node)
  visited_nodes = {}
  current_node = start_node

  until current_node.nil?
    return true if visited_nodes.has_key?(current_node)
    visited_nodes[current_node] = true
    current_node = current_node.next
  end

  false
end
=end
