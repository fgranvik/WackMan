import '../public/css/styles.css'

import Playground from './Playground'
import Player from './Player'
import Gui from './Gui'
import AudioPlayer from './AudioPlayer'
import Controls from './Controls'
import { DefaultSettings } from './Settings'
import { Direction } from './type'
import { compareObjects } from './Utils'

class Game {
  playground: Playground
  player: Player
  gui: Gui
  audioplayer: AudioPlayer
  controls: Controls
  isRunning: boolean
  timer: number
  showDebug: boolean
  debugArea: HTMLDivElement

  constructor() {
    this.playground = new Playground()
    this.player = new Player(this)
    this.gui = new Gui()
    this.audioplayer = new AudioPlayer()
    this.controls = new Controls(this)
    this.isRunning = false
    this.showDebug = false
    this.timer = Date.now()
    this.debugArea = document.querySelector('#debug') as HTMLDivElement
  }

  debug = (): void => {
    let debugData = [
      `Running: ${this.isRunning}`,
      '<br>',
      `X: ${this.player.position.X}, Y: ${this.player.position.Y}`,
      '<br>',
      `(CX): ${this.player.comparePosition.X}, (CY): ${this.player.comparePosition.Y}`,
      '<br>',
      `(AX): ${this.player.actualPosition.X}, (AY): ${this.player.actualPosition.Y}`,
      '<br>',
      `is ok? , nextBlock: ${this.player.nextBlock}`,
      '<br>',
      `Direction: ${this.player.direction}`,
      '<br>',
      `map_X: ${this.player.position.X}, map_Y: ${this.player.position.Y}`,
      '<br>',
      'asdf'
    ]
    this.debugArea.innerHTML = debugData.join('')
  }

  gameLoop = (timer: number): void => {
    if (this.isRunning) {
      const verifyTimer = Date.now()
      const diff = verifyTimer - timer
      console.log('gameLoop is running')

      this.debug()

      if (diff >= DefaultSettings.GAMELOOP) {
        this.player.move()
        timer = Date.now()
      }
    }
    requestAnimationFrame(this.gameLoop)
  }

  toggleRunning = (): void => {
    this.isRunning = !this.isRunning
  }

  init = (): void => {
    this.gameLoop(this.timer)
  }
}

const game = new Game()
game.init()

export default Game
