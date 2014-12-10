require 'rspec'
require_relative './is_palindrome'

describe "#is_palindrome?" do
  it "returns true for a palindrome with an odd length" do
    expect(is_palindrome?('racecar')).to be(true)
  end

  it "returns true for a palindrome with an even length" do
    expect(is_palindrome?('deed')).to be(true)
  end

  it "returns false for a non-palindrome" do
    expect(is_palindrome?('hoot')).to be(false)
  end
end

describe "#is_palindrome_rec?" do
  it "returns true for a palindrome with an odd length" do
    expect(is_palindrome?('racecar')).to be(true)
  end

  it "returns true for a palindrome with an even length" do
    expect(is_palindrome?('deed')).to be(true)
  end

  it "returns false for a non-palindrome" do
    expect(is_palindrome?('hoot')).to be(false)
  end
end
