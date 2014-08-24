def which_appears_twice(nums)
  seen_nums = {}

  nums.each do |num|
    return num if seen_nums.has_key?(num)
    seen_nums[num] = true
  end

  nil
end
