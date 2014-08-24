require 'rspec'
require_relative './matrix_region_sum'

describe "#matrix_region_sum" do
  it "sums an area of a square matrix" do
    matrix = [
      [4, 2, 7],
      [20, 5, 3],
      [8, 6, 17],
      [9, 1, 0]
    ]
    top_left_coords = [1, 1]
    bottom_right_coords = [2, 2]

    expect(matrix_region_sum(matrix, top_left_coords, bottom_right_coords))
      .to eq(31)
  end
end
