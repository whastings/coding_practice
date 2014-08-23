require 'rspec'
require_relative './max_stack'

describe MaxStack do
  subject(:stack) { MaxStack.new }
  let(:test_nums) { [1, 2, 3, 0, 7, 10, 4, 13, 6, 8] }
  before do
    test_nums.each { |num| stack.push(num) }
  end

  describe "#largest" do
    it "returns the current largest element in the stack" do
      expect(stack.largest).to eq(13)
      4.times { stack.pop }
      expect(stack.largest).to eq(10)
      2.times { stack.pop }
      expect(stack.largest).to eq(3)
    end
  end

  describe "#pop" do
    it "returns the top element from the stack" do
      expect(stack.pop).to eq(8)
    end

    it "removes the top element from the stack" do
      stack.pop
      expect(stack.pop).to eq(6)
    end
  end

  describe "#push" do
    it "adds an element to the top of the stack" do
      stack.push(20)
      expect(stack.pop).to eq(20)
    end
  end
end
