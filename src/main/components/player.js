export default class Player {
  constructor(game) {
    this.game = game
    this.x = game.canvas.width / 2
    this.y = -50
    // this.xLast = game.canvas.width / 2
    // this.yLast = -1000 / 16
    this.radius = 20
    this.color = 'white'

    this.keyMap = {
      65: 'left',
      68: 'right'
    }

    this.move = {
      left: false,
      right: false
    }

    this.playerMoveStart = e => {
      let key = this.keyMap[e.keyCode]
      this.move[key] = true
    }

    this.playerMoveStop = e => {
      let key = this.keyMap[e.keyCode]
      this.move[key] = false
    }

    // Moves Player
    window.addEventListener('keydown', this.playerMoveStart, false)
    window.addEventListener('keyup', this.playerMoveStop, false)
  }

  update(velocity) {
    if (this.move.left && this.x - 20 >= 0) {
      // this.xLast = this.x
      this.x -= velocity / 2
    }

    if (this.move.right && this.x + 20 <= this.game.canvas.width) {
      // this.xLast = this.x
      this.x += velocity / 2
    }
  }

  draw(interpolationPercentage) {
    // let x = this.xLast + (this.x - this.xLast) * interpolationPercentage

    this.game.context.circle(
      this.x,
      this.y,
      this.radius,
      this.color
    )
  }
}
