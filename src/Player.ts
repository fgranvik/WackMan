import Game from './Game'
import { gameMap } from './Playground'
import { DefaultSettings } from './Settings'
import { Direction, Position } from './type'

class Player {
  Game: Game
  direction?: Direction
  previousDirection?: Direction
  position: Position
  context: CanvasRenderingContext2D
  mouth_x: number
  mouth_y: number
  comparePosition: Position
  actualPosition: Position

  constructor(game: Game) {
    this.Game = game
    this.context = this.Game.playground.playerContext
    this.position = {
      X: 10,
      Y: 16
    }
    this.comparePosition = {
      X: 10,
      Y: 16
    }
    this.actualPosition = {
      X: 10 * DefaultSettings.BLOCK_SIZE,
      Y: 16 * DefaultSettings.BLOCK_SIZE
    }
    this.mouth_x = 0
    this.mouth_y = 0

    this.init()
  }

  clearCanvas = (): void => {
    this.context.clearRect(0, 0, DefaultSettings.WIDTH, DefaultSettings.HEIGHT)
  }

  positionMouth = (): void => {
    switch (this.direction) {
      case Direction.Left:
        this.mouth_y = 0.8
        this.mouth_x = 1.2
        break
      case Direction.Right:
        this.mouth_x = 0.2
        this.mouth_y = 1.8
        break
      case Direction.Up:
        this.mouth_x = -0.2
        this.mouth_y = 1.2
        break
      case Direction.Down:
        this.mouth_x = 0.8
        this.mouth_y = 0.2
        break
      default:
        this.mouth_x = 0.2
        this.mouth_y = 1.8
        break
    }
  }

  drawPlayer = (X: number, Y: number): void => {
    this.clearCanvas()
    this.positionMouth()

    try {
      this.context.beginPath()
      this.context.arc(
        X - DefaultSettings.BLOCK_SIZE / 2,
        Y - DefaultSettings.BLOCK_SIZE / 2,
        DefaultSettings.BLOCK_SIZE / 2,
        this.mouth_x * Math.PI,
        this.mouth_y * Math.PI,
        false
      )
      this.context.lineTo(
        X - DefaultSettings.BLOCK_SIZE / 2,
        Y - DefaultSettings.BLOCK_SIZE / 2
      )

      this.context.closePath()
      this.context.fillStyle = 'yellow'
      this.context.fill()
    } catch (e) {
      console.error('error in drawPlayer:', e)
    }
  }

  animateMovement = (): void => {
    switch (this.direction) {
      case Direction.Left:
        if (
          this.actualPosition.X >
          this.actualPosition.X + DefaultSettings.BLOCK_SIZE
        ) {
          this.actualPosition.X -= 2
        }
        break
      case Direction.Right:
        if (
          this.actualPosition.X <
          this.position.X * DefaultSettings.BLOCK_SIZE
        ) {
          this.actualPosition.X += 2
        }
        break
      case Direction.Up:
        if (
          this.actualPosition.Y >
          this.position.X * DefaultSettings.BLOCK_SIZE
        ) {
          this.actualPosition.Y -= 2
        }
        break
      case Direction.Down:
        if (
          this.actualPosition.Y <
          this.position.Y * DefaultSettings.BLOCK_SIZE
        ) {
          this.actualPosition.Y += 2
        }
        break
    }
    this.drawPlayer(this.actualPosition.X, this.actualPosition.Y)
    requestAnimationFrame(this.animateMovement)
  }

  validatePosition = (): boolean => {
    const point = gameMap[this.comparePosition.Y][this.comparePosition.X]
    return point != 1 ? true : false
  }

  move = (): void => {
    switch (this.direction) {
      case Direction.Down:
        this.position.Y += 1
        this.comparePosition.X = this.position.X - 1
        this.comparePosition.Y = this.position.Y
        break
      case Direction.Up:
        this.position.Y -= 1
        this.comparePosition.Y = this.position.Y - 2
        this.comparePosition.X = this.position.X - 1
        break
      case Direction.Right:
        this.position.X += 1
        this.comparePosition.Y = this.position.Y - 1
        this.comparePosition.X = this.position.X
        break
      case Direction.Left:
        this.position.X -= 1
        this.comparePosition.Y = this.position.Y - 1
        this.comparePosition.X = this.position.X - 2
        break
    }

    if (this.validatePosition()) {
      this.animateMovement()
    }
  }

  init = (): void => {
    this.drawPlayer(
      this.position.X * DefaultSettings.BLOCK_SIZE,
      this.position.Y * DefaultSettings.BLOCK_SIZE
    )
  }
}

export default Player
