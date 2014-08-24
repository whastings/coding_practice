require 'rspec'
require_relative './which_appears_twice'

describe "#which_appears_twice" do
  it "finds the one number that appears twice in a list of otherwise unique nums" do
    list = [1, 4, 6, 78, 9, 0, 5, 3, 0, 90, 100]
    expect(which_appears_twice(list)).to eq(0)
  end

  it "returns nil if no number appears twice in a list" do
    list = [1, 5, 6, 9, 0, 4, 3, 7]
    expect(which_appears_twice(list)).to be_nil
  end
end
