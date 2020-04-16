import desertBG from '../../assets/sprites/river-bg.png'

let Background = function (game) {
  this.game = game
  this.img = new Image()
  this.img.src = desertBG
  this.bg = {
    size: {
      width: 0,
      height: 0
    },
    pos: {
      width: 0,
      height: -this.img.height * 0.19
    }
  }

  game.context.translate(0, game.viewerSize.height)
}

Background.prototype.update = function (scrollSpeed) {
  this.bg.pos.height += scrollSpeed / 30

  if (this.bg.pos.height >= 0) {
    this.bg.pos.height = -this.img.height * 0.19
  }
}

Background.prototype.draw = function (interpolationPercentage) {
  this.game.context.drawImage(
    this.img,
    0,
    this.bg.pos.height,
    this.img.width * 0.19,
    this.img.height * 0.19
  )

  this.game.context.drawImage(
    this.img,
    0,
    this.bg.pos.height - this.img.height * 0.19,
    this.img.width * 0.19,
    this.img.height * 0.19
  )

  this.game.context.drawImage(
    this.img,
    0,
    this.bg.pos.height - (this.img.height * 0.19) * 2,
    this.img.width * 0.19,
    this.img.height * 0.19
  )
}

export default Background
