require 'rspec'
require './hash_map'

describe HashMap do
  subject(:hash) { HashMap.new }

  describe "#[]" do
    before { hash[:test] = 'test' }

    it "returns a stored value" do
      expect(hash[:test]).to eq('test')
    end

    it "returns nil for a non-existent value" do
      expect(hash[:non_existent]).to be_nil
    end
  end

  describe "#[]=" do
    it "stores an assigned value with a key" do
      hash[:key] = 'value'
      expect(hash[:key]).to eq('value')
    end

    it "updates an existing key's value" do
      hash[:key] = 'value'
      hash[:key] = 'other_value'
      expect(hash[:key]).to eq('other_value')
    end

    it "resizes the bucket store when the load limit is reached" do
      expect(hash.instance_variable_get(:@buckets).length).to eq(10)
      10.times { |num| hash[num] = num.to_s }
      expect(hash.instance_variable_get(:@buckets).length).to eq(20)
    end
  end

  describe "#delete" do
    it "removes a key/value pair when given a key" do
      hash[:key] = 'value'
      expect(hash.delete(:key)).to eq(true)
      expect(hash[:key]).to be_nil
    end

    it "returns false when asked to delete a non-existent key" do
      expect(hash.delete(:non_existent)).to eq(false)
    end
  end

  describe "#include?" do
    it "returns true for an existing key" do
      hash[:key] = 'value'
      expect(hash.include?(:key)).to eq(true)
    end

    it "returns false for a non-existent key" do
      expect(hash.include?(:non_existent)).to eq(false)
    end
  end
end
