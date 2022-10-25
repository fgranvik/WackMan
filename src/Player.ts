import Game from './Game'
import { DefaultSettings } from './Settings'
import { Direction, Position } from './type'

class Player {
  Game: Game
  direction?: Direction
  previousDirection?: Direction
  position: Position
  isAlive: boolean
  context: CanvasRenderingContext2D

  constructor(game: Game) {
    this.Game = game
    this.position = { X: 10, Y: 16 }
    this.direction = Direction.Down
    this.isAlive = false
    this.init()
    this.context = game.playground.context as CanvasRenderingContext2D
  }

  clearCanvas = (): void => {
    const context = this.Game.playground.context
    context?.clearRect(0, 0, DefaultSettings.WIDTH, DefaultSettings.HEIGHT)
  }

  drawPlayer = (): void => {
    debugger
    try {
      this.context.beginPath()
      this.context.fillStyle = '#FFF'
      this.context.arc(
        this.position.X * DefaultSettings.BLOCK_SIZE,
        this.position.Y * DefaultSettings.BLOCK_SIZE,
        2,
        0,
        2 * Math.PI
      )
      this.context.fill()
    } catch (e) {
      console.error('error in drawPlayer:', e)
    }
  }

  init = (): void => {
    console.log('Player init')
    this.drawPlayer()
  }
}

export default Player
