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
