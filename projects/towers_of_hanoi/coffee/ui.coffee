'use strict'

window.Towers = {} if window.Towers == undefined

UI = Towers.UI = {}

UI.init = (element, game) ->
  @element = element
  @game = game
  @selectedTower = null
  @selectedIndex = null
  addElements(element)

UI.play = ->
  bindHandlers.call(@)

addElements = (element) ->
  content = document.createDocumentFragment()
  for i in [1..3]
    tower = document.createElement('div')
    tower.classList.add('tower')
    tower.classList.add("tower#{i}")
    content.appendChild(tower)
    shadow = document.createElement('div')
    shadow.classList.add('tower-shadow')
    shadow.classList.add("tower-shadow-#{i}")
    content.appendChild(shadow)
  base = document.createElement('div')
  base.classList.add('towers-base')
  content.appendChild(base)
  element.appendChild(content)

bindHandlers = ->
  towers = @element.querySelectorAll('.tower')
  for tower, index in towers
    ((selectedTower, selectedIndex) =>
      tower.addEventListener('click', selectTower.bind(@, selectedTower, selectedIndex))
    )(tower, index)
  true

endGame = ->

moveDisc = (startTower, endTower) ->
  disc = startTower.childNodes[0]
  disc.parentNode.removeNode(disc)
  endTower.prependChild(disc)

selectTower = (tower, index) ->
  if @selectTower == null
    @selectedTower = tower
    @selectedIndex = index
  else
    moveDisc.call(@, @selectedTower, tower) if @game.makeMove(@selectedIndex, index)
