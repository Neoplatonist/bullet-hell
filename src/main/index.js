import React, { Component } from 'react'
import MainLoop from 'mainloop.js'
import Background from './components/background'
import Player from './components/player'
import './index.css'

export default class Main extends Component {
  constructor() {
    super()

    // Canvas viewport size
    this.viewerSize = {
      width: 379,
      height: 600
    }

    CanvasRenderingContext2D.prototype.circle = function (x, y, r, fillStyle) {
      this.beginPath()
      this.arc(x, y, r, 0, 2 * Math.PI, false)
      if (fillStyle) {
        this.fillStyle = fillStyle
      }
      this.fill()
    }

    CanvasRenderingContext2D.prototype.rectangle = function (x, y, width, height, color) {
      this.fillStyle = color
      this.fillRect(x, y, width, height)
    }
  }

  componentDidMount() {
    // set canvas
    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d')

    //set fps counter
    this.fpsCounter = document.getElementById('fpscounter')

    // canvas size
    this.canvas.width = this.viewerSize.width
    this.canvas.height = this.viewerSize.height
    this.start()
  }

  start = () => {
    this.background = new Background(this)
    this.player = new Player(this)

    // Start the main loop.
    MainLoop
      .setUpdate(this.update)
      .setDraw(this.draw)
      .setEnd(this.end)
      .start()
  }

  update = delta => {
    // console.log('delta: ', delta)
    this.background.update(delta) // we want it slower than the actual fps
    this.player.update(delta)
  }

  draw = interpolationPercentage => {
    // console.log('interpolationPercentage: ', interpolationPercentage)
    // fix fps offset here
    this.background.draw(interpolationPercentage)
    this.player.draw(interpolationPercentage)
  }

  end = (fps, panic) => {
    this.fpsCounter.textContent = Math.round(fps) + ' FPS'

    if (panic) {
      // This pattern introduces non-deterministic behavior, but in this case
      // it's better than the alternative (the application would look like it
      // was running very quickly until the simulation caught up to real
      // time). See the documentation for `MainLoop.setEnd()` for additional
      // explanation.
      let discardedTime = Math.round(MainLoop.resetFrameDelta())
      console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms')
    }
  }

  render() {
    return (
      <main>
        <canvas id="canvas"></canvas>

        <div id="fpscounter">0 FPS</div>
      </main>
    )
  }
}
