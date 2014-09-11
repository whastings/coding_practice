'use strict'

window.Towers = {} if window.Towers == undefined

Game = Towers.Game = {}

Game.init = ->
  @towers = [
    [3, 2, 1],
    [],
    []
  ]

Game.isWon = ->
  @towers[2].length == 3

Game.makeMove = (startTower, endTower) ->
  return false unless isValidMove.call(this, startTower, endTower)
  @towers[endTower].push(@towers[startTower].pop())
  true

isValidMove = (startTowerIdx, endTowerIdx) ->
  startTower = @towers[startTowerIdx]
  endTower = @towers[endTowerIdx]
  return true if endTower.length == 0
  return false if startTower.length == 0
  toMove = startTower.slice(-1)[0]
  toMoveTo = endTower.slice(-1)[0]
  toMove < toMoveTo
