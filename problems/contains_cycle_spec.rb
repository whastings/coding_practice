require 'rspec'
require_relative 'contains_cycle'

describe '#contains_cycle' do
  let(:start_node) { SingleLinkNode.new(1) }
  let(:nodes) { [start_node] }

  before do
    2.upto(4) do |num|
      new_node = SingleLinkNode.new(num)
      nodes << new_node
      nodes[num - 2].next = new_node
    end
  end

  it "returns false for a list with no cycle" do
    expect(contains_cycle?(start_node)).to be(false)
  end

  it "returns true for a list with a cycle" do
    new_node = SingleLinkNode.new(nodes.length + 1)
    new_node.next = start_node
    nodes.last.next = new_node

    expect(contains_cycle?(start_node)).to be(true)
  end
end
