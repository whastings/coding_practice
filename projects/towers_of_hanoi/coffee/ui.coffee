'use strict'

window.Towers = {} if window.Towers == undefined

UI = Towers.UI = {}

UI.init = (element, game) ->
  @element = element
  @game = game
  @selectedIndex = null
  @towers = []

UI.play = ->
  addElements.call(@, @element)
  bindHandlers.call(@)

addDiscs = (tower) ->
  for i in [1..3]
    disc = document.createElement('div')
    for className in ['disc', "disc#{i}", "ord#{i}"]
      disc.classList.add(className)
    tower.appendChild(disc)

addElements = (element) ->
  content = document.createDocumentFragment()
  base = document.createElement('div')
  base.classList.add('towers-base')
  content.appendChild(base)
  addTowers.call(@, content)
  element.appendChild(content)

addTowers = (content) ->
  for i in [1..3]
    tower = document.createElement('div')
    tower.classList.add('tower')
    tower.classList.add("tower#{i}")
    content.appendChild(tower)
    @towers.push(tower)
    shadow = document.createElement('div')
    shadow.classList.add('tower-shadow')
    shadow.classList.add("tower-shadow-#{i}")
    content.appendChild(shadow)
  addDiscs(@towers[0])

bindHandlers = ->
  towers = @element.querySelectorAll('.tower')
  for tower, index in towers
    ((selectedTower, selectedIndex) =>
      tower.addEventListener('click', selectTower.bind(@, selectedIndex))
    )(tower, index)
  true

endGame = ->

moveDisc = (startIndex, endIndex) ->
  startTower = @towers[startIndex]
  endTower = @towers[endIndex]
  disc = startTower.lastChild
  oldOrd = @game.towers[startIndex].length + 1
  newOrd = @game.towers[endIndex].length
  disc.classList.remove("ord#{oldOrd}")
  disc.classList.add("ord#{newOrd}")
  disc.parentNode.removeChild(disc)
  endTower.appendChild(disc)

selectTower = (index) ->
  if @selectedIndex == null
    @selectedIndex = index
  else
    moveDisc.call(@, @selectedIndex, index) if @game.makeMove(@selectedIndex, index)
    @selectedIndex = null
