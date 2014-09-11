'use strict'

window.Towers = {} if window.Towers == undefined

UI = Towers.UI = {}

UI.init = (element, game) ->
  @element = element
  @game = game

UI.play = ->
  bindHandlers.call(@)

bindHandlers = ->
  towers = @element.querySelectorAll('.tower')
  for tower, index in towers
    ((selectedTower, selectedIndex) =>
      tower.addEventListener('click', selectTower.bind(@, selectedTower, selectedIndex))
    )(tower, index)
  true

endGame = ->

selectTower = (tower, index) ->

