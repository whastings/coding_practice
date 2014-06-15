class LinkedList
  attr_reader :first, :last

  def push(value)
    new_node = LinkedListNode.new(value, self.last)
    if self.last
      self.last.next = new_node
    else
      self.first = new_node
    end
    self.last = new_node
  end

  def unshift(value)
    new_node = LinkedListNode.new(value, nil, self.first)
    if self.first
      self.first.previous = new_node
    else
      self.last = new_node
    end
    self.first = new_node
  end

  protected

  attr_writer :first, :last
end
