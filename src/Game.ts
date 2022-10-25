import '../public/css/styles.css'

import Playground from './Playground'
import Player from './Player'
import Gui from './Gui'
import AudioPlayer from './AudioPlayer'
import Controls from './Controls'
import { DefaultSettings } from './Settings'
import { Direction } from './type'

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
      `(X): ${this.player.comparePosition.X}, (Y): ${this.player.comparePosition.Y}`,
      '<br>',
      `(AX): ${this.player.actualPosition.X}, (AY): ${this.player.actualPosition.Y}`,
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
    const verifyTimer = Date.now()
    const diff = verifyTimer - timer

    this.debug()
    if (this.isRunning) {
      if (diff >= DefaultSettings.GAMELOOP) {
        this.player.move()
        timer = Date.now()
      }
    } else {
    }
    requestAnimationFrame(this.gameLoop)
  }

  toggleRunning = (): void => {
    this.isRunning = !this.isRunning
  }

  init = (): void => {
    this.gameLoop(this.timer)
    this.playground.drawPlayground()
  }
}

const game = new Game()
game.init()

export default Game
