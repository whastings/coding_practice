require 'rspec'
require_relative './digital_root'

describe "#digital_root" do
  it "sums the digits of a small number" do
    expect(digital_root(15)).to eq(6)
  end

  it "recursively sums the digits until reaching a single digit" do
    expect(digital_root(895)).to eq(4)
  end
end
