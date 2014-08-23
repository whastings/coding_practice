require 'rspec'
require_relative './string_reverse'

describe "#string_reverse" do
  it "reverses strings in place" do
    strings = [
      'abcd',
      'ruby is awesome',
      'JavaScript is sweet'
    ]
    reversed_strings = strings.map(&:reverse)

    strings.each { |string| reverse_string(string) }
    strings.each_with_index do |string, index|
      expect(string).to eq(reversed_strings[index])
    end
  end
end
