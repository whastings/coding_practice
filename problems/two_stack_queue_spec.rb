require 'rspec'
require_relative './two_stack_queue'

describe TwoStackQueue do
  subject(:queue) { TwoStackQueue.new }
  let(:items) { [:a, :b, :c, :d, :e, :f, :g] }
  before do
    items.each { |item| queue.enqueue(item) }
  end

  describe "FIFO ordering" do
    it "maintains correct ordering" do
      retrieved_items = []
      items.length.times { retrieved_items << queue.dequeue }
      expect(retrieved_items).to eq(items)
    end
  end
end
