require 'rspec'
require_relative 'permutation_palindrome'

describe "#permutation_palindrome" do
  it "returns true for strings that can be rearranged into a palindrome" do
    strings = %w(racecar ecarcar civic ivicc deed lollollol)
    strings.each do |string|
      expect(permutation_palindrome?(string)).to be(true)
    end
  end

  it "returns false otherwise" do
    strings = %w(civil ivli lollollo deem)
    strings.each do |string|
      expect(permutation_palindrome?(string)).to be(false)
    end
  end
end
