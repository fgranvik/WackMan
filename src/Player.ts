import Game from './Game'
import { gameMap } from './Playground'
import { DefaultSettings } from './Settings'
import { Direction, Position } from './type'

class Player {
  Game: Game
  direction: Direction
  previousDirection?: Direction
  position: Position
  context: CanvasRenderingContext2D
  mouth_x: number
  mouth_y: number
  comparePosition: Position
  actualPosition: Position
  nextBlock: number

  constructor(game: Game) {
    this.Game = game
    this.context = this.Game.playground.playerContext
    this.direction = Direction.Right
    this.position = {
      X: 4,
      Y: 9
    }
    this.comparePosition = {
      X: 0,
      Y: 0
    }
    this.actualPosition = {
      X: this.position.X * DefaultSettings.BLOCK_SIZE,
      Y: this.position.Y * DefaultSettings.BLOCK_SIZE
    }
    this.mouth_x = 0
    this.mouth_y = 0
    this.nextBlock = 0

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
    // this.drawCompare(this.comparePosition.X, this.comparePosition.Y)

    try {
      this.context.beginPath()
      this.context.arc(
        X + DefaultSettings.BLOCK_SIZE / 2,
        Y + DefaultSettings.BLOCK_SIZE / 2,
        DefaultSettings.BLOCK_SIZE / 2,
        this.mouth_x * Math.PI,
        this.mouth_y * Math.PI,
        false
      )
      this.context.lineTo(
        X + DefaultSettings.BLOCK_SIZE / 2,
        Y + DefaultSettings.BLOCK_SIZE / 2
      )

      this.context.closePath()
      this.context.fillStyle = 'yellow'
      this.context.fill()
    } catch (e) {
      console.error('error in drawPlayer:', e)
    }
  }

  drawCompare = (X: number, Y: number): void => {
    this.context.beginPath()
    this.context.lineWidth = 1

    this.context.strokeStyle = 'red'
    this.context.rect(
      X * DefaultSettings.BLOCK_SIZE,
      Y * DefaultSettings.BLOCK_SIZE,
      DefaultSettings.BLOCK_SIZE,
      DefaultSettings.BLOCK_SIZE
    )
    this.context.stroke()
  }

  animateMovement = (): void => {
    switch (this.direction) {
      case Direction.Left:
        if (
          this.actualPosition.X >
          this.comparePosition.X * DefaultSettings.BLOCK_SIZE
        ) {
          this.actualPosition.X -= 2
        }
        break
      case Direction.Right:
        if (
          this.actualPosition.X <
          this.comparePosition.X * DefaultSettings.BLOCK_SIZE
        ) {
          this.actualPosition.X += 2
        }
        break
      case Direction.Up:
        if (
          this.actualPosition.Y >
          this.comparePosition.Y * DefaultSettings.BLOCK_SIZE
        ) {
          this.actualPosition.Y -= 2
        }
        break
      case Direction.Down:
        if (
          this.actualPosition.Y <
          this.comparePosition.Y * DefaultSettings.BLOCK_SIZE
        ) {
          this.actualPosition.Y += 2
        }
        break
    }
    this.drawPlayer(this.actualPosition.X, this.actualPosition.Y)
    requestAnimationFrame(this.animateMovement)
  }

  validatePosition = (): boolean => {
    this.nextBlock = gameMap[this.comparePosition.Y][this.comparePosition.X]
    console.log('next', this.nextBlock)
    return this.nextBlock == 1 ? false : true
  }

  move = (): void => {
    let valid = false
    this.comparePosition = Object.assign({}, this.position)

    // Validate next position
    switch (this.direction) {
      case Direction.Down: {
        this.comparePosition.Y += 1

        if (this.validatePosition()) {
          this.position.Y += 1
          this.animateMovement()
        } else {
          this.comparePosition.Y -= 1
        }
        break
      }
      case Direction.Up: {
        this.comparePosition.Y -= 1
        if (this.validatePosition()) {
          this.position.Y -= 1
          this.animateMovement()
        } else {
          this.comparePosition.Y += 1
        }
        break
      }
      case Direction.Right: {
        this.comparePosition.X += 1
        if (this.validatePosition()) {
          this.position.X += 1
          this.animateMovement()
        } else {
          this.comparePosition.X -= 1
        }
        break
      }
      case Direction.Left: {
        this.comparePosition.X -= 1
        if (this.validatePosition()) {
          if (this.comparePosition.X <= -1) {
            this.position.X = 19
            debugger
            // DefaultSettings.WIDTH / DefaultSettings.BLOCK_SIZE - 1
          } else {
            this.position.X -= 1
          }
          this.animateMovement()
        } else {
          this.comparePosition.X += 1
        }
        break
      }
    }

    // if (false) {
    //   this.animateMovement()
    // }
  }

  init = (): void => {
    this.drawPlayer(
      this.position.X * DefaultSettings.BLOCK_SIZE,
      this.position.Y * DefaultSettings.BLOCK_SIZE
    )
    // this.drawPlayer(0, 0)
  }
}

export default Player
