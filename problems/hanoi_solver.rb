class HanoiSolver
  attr_reader :game

  def initialize(num_disks)
    @num_disks = num_disks
    @game = HanoiTower.new(num_disks)
  end

  def solve
    solve_rec(@num_disks, 1, 3)
  end

  private

  def find_spare_tower(start_tower, end_tower)
    ([1, 2, 3] - [start_tower, end_tower])[0]
  end

  def solve_rec(num_disks, start_tower, end_tower)
    return if num_disks == 0
    smaller_num = num_disks - 1

    # Move all disks except the bottom one to the spare tower.
    spare_tower = find_spare_tower(start_tower, end_tower)
    solve_rec(smaller_num, start_tower, spare_tower)
    # Move bottom disk to the target tower.
    @game.move(start_tower, end_tower)
    # Move other disks from the spare tower to the target tower.
    solve_rec(smaller_num, spare_tower, end_tower)
  end
end


class HanoiTower
  def initialize(num_disks)
    @towers = [[], [], []]
    num_disks.downto(1) { |i| @towers.first << i }
  end

  def move(start_tower, end_tower)
    unless valid_move?(start_tower, end_tower)
      raise ArgumentError, 'Invalid move.'
    end
    @towers[end_tower - 1] << @towers[start_tower - 1].pop
    @towers
  end

  def over?
    @towers[0].empty? && @towers[1].empty?
  end

  def valid_move?(start_tower, end_tower)
    start_tower = @towers[start_tower - 1]
    end_tower = @towers[end_tower - 1]
    !start_tower.empty? && (end_tower.empty? || start_tower.last < end_tower.last)
  end
end
