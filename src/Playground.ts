import { DefaultSettings } from './Settings'
import { Position } from './type'

/*
Default map

1111111111111111111
1000000001000000001
1011011101011101101
1000000000000000001
1011010111110101101
1000010001000010001
11110111e1e11101111
eee101eeeeeee101eee
111101e11111e101111
00000ee1eee1ee00000
111101e11111e101111
eee101eeeeeee101eee
111101e11111e101111
1000000001000000001
1011011101011101101
1001000000000001001
1101010111110101011
1000010001000100001
1011111101011111101
1000000000000000001
1111111111111111111

*/

// 0 = empty space
// 1 = Wall
// 2 = pathway

export const gameMap: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
  [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 4, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 1, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 1, 2, 2, 1],
  [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

class Playground {
  canvas: HTMLCanvasElement
  playerCanvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  playerContext: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.playerCanvas = document.createElement('canvas') as HTMLCanvasElement
    this.playerContext = this.playerCanvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D
    this.init()
  }

  createCanvas = (): void => {
    this.canvas.width = this.playerCanvas.width = DefaultSettings.WIDTH
    this.canvas.height = this.playerCanvas.height = DefaultSettings.HEIGHT
    this.canvas.id = 'playground'
    this.playerCanvas.id = 'player'
    const gameArea = document.querySelector('#gameArea')
    gameArea?.appendChild(this.canvas)
    gameArea?.appendChild(this.playerCanvas)
  }

  drawBlock = (color: string, x: number, y: number): void => {
    try {
      this.context.fillStyle = color
      this.context.fillRect(
        x * DefaultSettings.BLOCK_SIZE,
        y * DefaultSettings.BLOCK_SIZE,
        DefaultSettings.BLOCK_SIZE,
        DefaultSettings.BLOCK_SIZE
      )
    } catch (e) {
      console.error('drawBlock', e)
    }
  }

  drawPlayground = (): void => {
    let x: number = 0
    let y: number = 0

    gameMap.forEach((line) => {
      line.forEach((block) => {
        switch (block) {
          case 0:
            {
              const color = '#000'
              this.drawBlock(color, x, y)
            }
            break
          case 1:
            {
              const color = 'blue'

              // this.drawBlock(color, x, y)
              this.context.fillStyle = 'rgb(0, 0, 100)'
              this.context.fillRect(
                x * DefaultSettings.BLOCK_SIZE,
                y * DefaultSettings.BLOCK_SIZE,
                DefaultSettings.BLOCK_SIZE,
                DefaultSettings.BLOCK_SIZE
              )
              this.context.beginPath()
              this.context.moveTo(
                x * DefaultSettings.BLOCK_SIZE,
                y * DefaultSettings.BLOCK_SIZE + DefaultSettings.BLOCK_SIZE / 3
              )
              this.context.lineTo(
                x * DefaultSettings.BLOCK_SIZE + DefaultSettings.BLOCK_SIZE,
                y * DefaultSettings.BLOCK_SIZE + DefaultSettings.BLOCK_SIZE / 3
              )
              this.context.moveTo(
                x * DefaultSettings.BLOCK_SIZE,
                y * DefaultSettings.BLOCK_SIZE +
                  DefaultSettings.BLOCK_SIZE * 0.67
              )
              this.context.lineTo(
                x * DefaultSettings.BLOCK_SIZE + DefaultSettings.BLOCK_SIZE,
                y * DefaultSettings.BLOCK_SIZE +
                  DefaultSettings.BLOCK_SIZE * 0.67
              )
              this.context.strokeStyle = color
              this.context.stroke()
            }
            break
          case 2:
            {
              try {
                this.context.beginPath()
                this.context.fillStyle = '#FFF'
                this.context.arc(
                  x * DefaultSettings.BLOCK_SIZE +
                    DefaultSettings.BLOCK_SIZE / 2,
                  y * DefaultSettings.BLOCK_SIZE +
                    DefaultSettings.BLOCK_SIZE / 2,
                  3,
                  0,
                  2 * Math.PI
                )
                this.context.fill()
              } catch (e) {
                console.error('draw Block, type 2:', e)
              }
            }
            break
        }
        x += 1
      })
      x = 0
      y += 1
    })
  }

  init = (): void => {
    this.createCanvas()
    this.drawPlayground()
  }
}

export default Playground
