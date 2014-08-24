def matrix_region_sum(matrix, top_left_coords, bottom_right_coords)
  sum = 0
  start_row, start_col = top_left_coords
  end_row, end_col = bottom_right_coords

  (start_row..end_row).each do |row|
    (start_col..end_col).each do |col|
      sum += matrix[row][col]
    end
  end
  sum
end
