export default class Bullet {
  constructor(game, active) {
    this.game = game
    this.size = {
      width: 5,
      height: 15
    }
    this.x = this.game.player.x - this.size.width / 2
    this.y = -50
    this.active = active || false
    this.color = 'white'
  }

  update(velocity) {
    this.y -= velocity / 2

    this.updateHitbox()
  }

  draw(interpolationPercentage) {
    this.game.context.rectangle(
      this.x,
      this.y,
      this.size.width,
      this.size.height,
      this.color
    )
  }

  updateHitbox() {

  }
}
