import '../public/css/styles.css'

import Playground from './Playground'
import Player from './Player'
import Gui from './Gui'
import AudioPlayer from './AudioPlayer'
import Controls from './Controls'
import { DefaultSettings } from './Settings'

class Game {
  playground: Playground
  player: Player
  gui: Gui
  audioplayer: AudioPlayer
  controls: Controls
  isRunning: boolean
  timer: number
  showDebug: boolean

  constructor() {
    this.playground = new Playground()
    this.player = new Player(this)
    this.gui = new Gui()
    this.audioplayer = new AudioPlayer()
    this.controls = new Controls(this)
    this.isRunning = false
    this.showDebug = false
    this.timer = Date.now()
  }

  gameLoop = (timer: number): void => {
    requestAnimationFrame(() => {
      const verifyTimer = Date.now()
      const diff = verifyTimer - timer

      if (this.isRunning) {
        console.log('game is running')
        if (diff >= DefaultSettings.GAMELOOP) {
          //
          timer = Date.now()
        }
      } else {
        console.log('game is paused')
      }

      this.gameLoop(timer)
    })
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
