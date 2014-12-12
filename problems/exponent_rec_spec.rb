require 'rspec'
require './exponent_rec'

describe "#exponent_rec" do
  it 'computes a number to the power of zero as one' do
    expect(exponent_rec(5, 0)).to eq(1)
  end

  it 'computes a number to a negative power as the reciprocal of the positive' do
    expect(exponent_rec(5, -2)).to eq(1.0 / 25)
  end

  it 'computes a number to the power of an odd exponent' do
    expect(exponent_rec(3, 5)).to eq(243)
  end

  it 'computes a number to the power of an even exponent' do
    expect(exponent_rec(3, 4)).to eq(81)
  end
end
