require 'rspec'
require_relative './longest_palindrome'

describe "#longest_palindrome" do
  it "returns the whole string for a one word palindrome" do
    expect(longest_palindrome('racecar')).to eq('racecar')
  end

  it "returns the longest palindrome out of several" do
    list = 'deed civic racecar terret'
    expect(longest_palindrome(list)).to eq(' racecar ')
  end
end
