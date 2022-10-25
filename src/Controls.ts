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
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      this.keyPressed = e.code
      // console.info('Key pressed: ', this.keyPressed)

      switch (this.keyPressed) {
        case 'KeyM':
          console.log('Toggle music')
          break
        case 'Space':
          console.log('pressed Space')
          this.Game.toggleRunning()
          break
        // Game direction
        case 'ArrowDown':
          this.Game.player.direction = Direction.Down
          this.Game.player.move()
          break
        case 'ArrowUp':
          this.Game.player.direction = Direction.Up
          this.Game.player.move()
          break
        case 'ArrowLeft':
          this.Game.player.direction = Direction.Left
          this.Game.player.move()
          break
        case 'ArrowRight':
          this.Game.player.direction = Direction.Right
          this.Game.player.move()
          break
      }
    })
  }
}

export default Controls
