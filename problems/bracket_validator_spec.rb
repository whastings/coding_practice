require 'rspec'
require_relative './bracket_validator'

describe "#validate_brackets" do
  it "handles only one type of brackets" do
    tests = {
      '{}' => true,
      '{}{}' => true,
      '{{{},{{}}}}' => true,
      '{}}' => false,
      '{{{},{{}}}' => false,
      '{}{}}{' => false
    }
    tests.each do |test_string, result|
      expect(validate_brackets(test_string)).to be(result)
    end
  end

  it "handles multiple kinds of brackets" do
    tests = {
     '{[]()}' => true,
     '{[(])}' => false,
     '{[}' => false
    }
    tests.each do |test_string, result|
      expect(validate_brackets(test_string)).to be(result)
    end
  end
end
