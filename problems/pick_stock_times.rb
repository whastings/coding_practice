# O(n) version.
def pick_stock_times(data)
  lowest_price, highest_price = 0, 0
  buy_time, sell_time = nil, nil

  data.each_with_index do |price, time|
    if lowest_price == 0 || price < lowest_price
      lowest_price, buy_time = price, time
    elsif price > highest_price
      highest_price, sell_time = price, time
    end
  end

  [buy_time, sell_time, highest_price - lowest_price]
end

# O(n^2) version.
=begin
def pick_stock_times(data)
  best_price, buy_time, sell_time = 0, nil, nil

  (0...data.length - 1).each do |start_time|
    (start_time + 1...data.length).each do |end_time|
      new_price = data[end_time] - data[start_time]
      if new_price > best_price
        buy_time, sell_time = start_time, end_time
        best_price = new_price
      end
    end
  end

  [buy_time, sell_time, best_price]
end
=end
