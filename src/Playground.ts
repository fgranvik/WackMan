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

const gameMap = [
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
  context: CanvasRenderingContext2D
  applePosition: Position

  constructor() {
    this.applePosition = { X: 0, Y: 0 }
    this.init()
  }

  createCanvas = (): void => {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.width = DefaultSettings.WIDTH
    this.canvas.height = DefaultSettings.HEIGHT
    document.body.append(this.canvas)
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
              const color = '#009'
              this.drawBlock(color, x, y)
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
                  2,
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
    console.log('playground init')
    this.createCanvas()
    this.drawPlayground()
  }
}

export default Playground
