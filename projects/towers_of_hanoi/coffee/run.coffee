game = Object.create(Towers.Game)
game.init()
element = document.querySelector('.towers-container')
ui = Object.create(Towers.UI)
ui.init(element, game)
ui.play()
