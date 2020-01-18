#
# Hash Map
#
# - O(1) for lookups, deletes, and adds
# - But doesn't preserve element order
# - Tends to have a large memory footprint
# - Accessing value requires hashing key
#   - Hashing algorithm needs to be idempotent, be fast, have good distrbution to prevent collisions
#   - With values in an array, hash % length gives you index of element in array
# - Can use an array of buckets (array of arrays) to deal with collisions
#   - First find bucket in O(1), then find element in bucket in O(n)
#   - When buckets start getting too full, you can add more buckets and redistribute the elements
#

class HashMap
  LOAD_LIMIT = 0.9
  START_SIZE = 10

  def [](key)
    pair = get_pair(key)
    pair.nil? ? nil : pair.last
  end

  def []=(key, value)
    pair = get_pair(key)
    if pair
      pair[-1] = value
    else
      find_bucket(key) << [key, value]
      self.num_elements += 1
      resize if resize_needed?
    end
    true
  end

  def delete(key)
    pair = get_pair(key)
    return false unless pair
    find_bucket(key).delete(pair)
    true
  end

  def include?(key)
    !self[key].nil?
  end

  def initialize
    self.buckets = Array.new(START_SIZE) { [] }
    self.num_elements = 0
  end

  protected

  attr_accessor :buckets, :num_elements

  private

  def find_bucket(key)
    self.buckets[key.hash % self.buckets.length]
  end

  def get_pair(key)
    bucket = find_bucket(key)
    bucket.each do |pair|
      element_key = pair.first
      return pair if element_key == key
    end
    nil
  end

  def load_factor
    self.num_elements / self.buckets.length
  end

  def resize
    old_buckets = self.buckets
    self.buckets = Array.new(self.buckets.length * 2) { [] }
    old_buckets.each do |bucket|
      bucket.each do |pair|
        find_bucket(pair.first) << pair
      end
    end
  end

  def resize_needed?
    load_factor >= LOAD_LIMIT
  end
end
