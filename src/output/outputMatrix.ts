import { Position } from '../graphs/position'
import { OutputInfo } from './outputInfo'

export class OutputMatrix {
  private readonly nodes: OutputInfo[][];

  constructor (public height: number, public width: number) {
    this.nodes = []
    for (let i = 0; i < height; i++) {
      const row = []
      for (let j = 0; j < width; j++) {
        row.push(null)
      }
      this.nodes.push(row)
    }
  }

  set (info: OutputInfo, position: Position) {
    this.nodes[position.line][position.column] = info
  }

  get (position: Position) {
    return this.nodes[position.line][position.column]
  }
}
