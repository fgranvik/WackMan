import Game from './Game'
import { Direction } from './type'

class Controls {
  Game: Game
  keyPressed?: string

  constructor(game: Game) {
    this.Game = game
    this.init()
  }

  init = (): void => {
    console.log('init controls')
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      this.keyPressed = e.code
      console.log('key pressed', this.keyPressed)

      switch (this.keyPressed) {
        case 'KeyM':
          console.log('pressed M')
          break
        case 'Space':
          console.log('pressed Space')
          this.Game.toggleRunning()
          break
        // Game direction
        case 'ArrowDown':
          debugger

          if (this.Game.player.previousDirection == Direction.Up) return
          this.Game.player.direction = Direction.Down
          break
        case 'ArrowUp':
          debugger
          if (this.Game.player.previousDirection == Direction.Down) return
          this.Game.player.direction = Direction.Up
          break
        case 'ArrowLeft':
          debugger
          if (this.Game.player.previousDirection == Direction.Right) return
          this.Game.player.direction = Direction.Left
          break
        case 'ArrowRight':
          debugger
          if (this.Game.player.previousDirection == Direction.Left) return
          this.Game.player.direction = Direction.Right
          break
      }
    })
  }
}

export default Controls
