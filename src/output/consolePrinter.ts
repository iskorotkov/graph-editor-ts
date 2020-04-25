import { Graph } from '../graphs/graph'
import { Position } from '../graphs/position'
import { Offsets } from './offsets'
import { OutputInfo } from './outputInfo'
import { OutputMatrix } from './outputMatrix'

enum OutputChar {
  Corner = '+',
  VerticalEdge = '|',
  HorizontalEdge = '-',
  EmptySpaceOutside = ' ',
  EmptySpaceInside = ' '
}

export class ConsolePrinter {
  print (graph: Graph) {
    const matrix = new OutputMatrix(
      graph.dimensions.height,
      graph.dimensions.width
    )
    this.validate(graph)
    this.gatherInfo(graph, matrix)
    this.printNodes(matrix)
  }

  private validate (graph: Graph) {
    for (let line = 0; line < graph.dimensions.height; line++) {
      for (let column = 0; column < graph.dimensions.width; column++) {
        const count = graph.nodes.filter((x) =>
          x.overlaps(new Position(line, column))
        ).length
        if (count > 1) {
          throw new Error('More than one node in given cell')
        }
      }
    }
  }

  private gatherInfo (graph: Graph, matrix: OutputMatrix) {
    for (const node of graph.nodes) {
      const width = node.dimensions.width
      const height = node.dimensions.height
      for (let nodeLine = 0; nodeLine < height; nodeLine++) {
        for (let nodeColumn = 0; nodeColumn < width; nodeColumn++) {
          const canvasLine = node.top + nodeLine
          const canvasColumn = node.left + nodeColumn

          const position = new Position(canvasLine, canvasColumn)
          const offsets = new Offsets(
            nodeColumn,
            nodeLine,
            width - nodeColumn - 1,
            height - nodeLine - 1
          )

          const info = new OutputInfo(
            node,
            node.onEdge(position),
            position,
            offsets
          )

          matrix.set(info, position)
        }
      }
    }
  }

  private printNodes (matrix: OutputMatrix) {
    for (let line = 0; line < matrix.height; line++) {
      let str = ''

      for (let column = 0; column < matrix.width; column++) {
        const position = new Position(line, column)
        const elem = matrix.get(position)

        if (elem) {
          if (elem.isEdge) {
            str += this.writeEdge(elem)
          } else {
            str = this.writeNodeContent(elem, str)
          }
        } else {
          str += OutputChar.EmptySpaceOutside
        }
      }

      console.log(str)
    }
  }

  private writeNodeContent (elem: OutputInfo, str: string) {
    if (elem.offsetsInNode.top === 1) {
      str = this.writeHeader(elem, str)
    } else {
      str = this.writeContentText(elem, str)
    }
    return str
  }

  private writeContentText (elem: OutputInfo, str: string) {
    let index = (elem.offsetsInNode.top - 2) * (elem.node.dimensions.width - 2)
    index += elem.offsetsInNode.left - 1
    if (elem.node.content.text.length > index) {
      str += elem.node.content.text[index]
    } else {
      str += OutputChar.EmptySpaceInside
    }
    return str
  }

  private writeHeader (elem: OutputInfo, str: string) {
    const index = elem.offsetsInNode.left - 1
    if (elem.node.content.title.length > index) {
      str += elem.node.content.title[index]
    } else {
      str += OutputChar.EmptySpaceInside
    }
    return str
  }

  private writeEdge (elem: OutputInfo) {
    const offsets = elem.offsetsInNode
    if (offsets.top === 0 || offsets.bottom === 0) {
      if (offsets.left === 0 || offsets.right === 0) {
        return OutputChar.Corner
      }
      return OutputChar.HorizontalEdge
    }
    return OutputChar.VerticalEdge
  }
}
