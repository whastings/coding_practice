require 'rspec'
require_relative './pick_stock_times'

describe "#pick_stock_times" do
  let(:data) do
    [300, 500, 200, 400, 800, 600]
  end

  it "returns by and sell times for a simple case" do
    expect(pick_stock_times(data)).to eq([2, 4, 600])
  end
end
