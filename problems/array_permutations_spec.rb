require 'rspec'
require_relative 'array_permutations'

describe '#array_permutations' do
  it 'handles a small array' do
    array = [1, 2, 3]
    expect(array_permutations(array)).to eq(array.permutation.to_a)
  end

  it 'handles a larger array' do
    array = [1, 4, 5, 7, 8, 90, 2]
    expect(array_permutations(array)).to eq(array.permutation.to_a)
  end
end
