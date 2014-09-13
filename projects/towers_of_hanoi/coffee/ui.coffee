'use strict'

window.Towers = {} if window.Towers == undefined

UI = Towers.UI = {}

UI.init = (element, game) ->
  @element = element
  @game = game
  @selectedIndex = null
  @towers = []
  @clickHandlers = []

UI.play = ->
  addElements.call(@, @element)
  bindHandlers.call(@)

addDiscs = (tower) ->
  for i in [1..3]
    disc = document.createElement('div')
    for className in ['disc', "disc#{i}", "ord#{i}"]
      disc.classList.add(className)
    tower.appendChild(disc)
  true

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
      handler = selectTower.bind(@, selectedIndex)
      @clickHandlers.push(handler)
      tower.addEventListener('click', handler)
    )(tower, index)
  true

checkGameOver = ->
  return unless @game.isWon()
  alert('You won!')
  for tower, i in @towers
    tower.removeEventListener('click', @clickHandlers[i])
  true

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
  checkGameOver.call(@)

selectTower = (index) ->
  if @selectedIndex == null
    @selectedIndex = index
    @towers[index].classList.add('selected')
  else
    moveDisc.call(@, @selectedIndex, index) if @game.makeMove(@selectedIndex, index)
    @towers[@selectedIndex].classList.remove('selected')
    @selectedIndex = null
