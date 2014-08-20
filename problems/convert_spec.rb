require 'rspec'
require './convert'

describe "#convert" do
  it "converts 5 to 5 for base 10" do
    expect(convert(5, 10)).to eq('5')
  end

  it "converts 5 to 101 for base 2" do
    expect(convert(5, 2)).to eq('101')
  end

  it "converts 5 to 5 for base 16" do
    expect(convert(5, 16)).to eq('5')
  end

  it "converts 234 to 11101010 for base 2" do
    expect(convert(234, 2)).to eq('11101010')
  end

  it "converts 234 to EA for base 16" do
    expect(convert(234, 16)).to eq('EA')
  end
end
