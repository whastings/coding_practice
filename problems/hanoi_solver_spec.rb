require 'rspec'
require './hanoi_solver'

describe HanoiSolver do
  describe "#solve" do
    it 'solves a game with five disks' do
      solver = HanoiSolver.new(5)
      solver.solve

      expect(solver.game.over?).to be(true)
    end

    it 'solves a game with 15 disks' do
      solver = HanoiSolver.new(15)
      solver.solve

      expect(solver.game.over?).to be(true)
    end
  end
end
