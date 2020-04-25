import { Graph } from '../graphs/graph'
import { Position } from '../graphs/position'
import { Offsets } from './offsets'
import { OutputInfo } from './outputInfo'
import { OutputMatrix } from './outputMatrix'

export class ConsolePrinter {
  print (graph: Graph) {
    const matrix = new OutputMatrix(
      graph.dimensions.height,
      graph.dimensions.width
    )
    this.validate(graph)
    ConsolePrinter.gatherInfo(graph, matrix)
    ConsolePrinter.printNodes(matrix)
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

  private static gatherInfo (graph: Graph, matrix: OutputMatrix) {
    for (const node of graph.nodes) {
      const width = node.dimensions.width
      const height = node.dimensions.height
      for (let nodeLine = 0; nodeLine < height; nodeLine++) {
        for (let nodeColumn = 0; nodeColumn < width; nodeColumn++) {
          const canvasLine = node.top + nodeLine
          const canvasColumn = node.left + nodeColumn

          const position = new Position(canvasLine, canvasColumn)
          const info = new OutputInfo(
            node,
            node.onEdge(position),
            position,
            new Offsets(
              nodeColumn,
              nodeLine,
              width - nodeColumn - 1,
              height - nodeLine - 1
            )
          )

          matrix.set(info, position)
        }
      }
    }
  }

  private static printNodes (matrix: OutputMatrix) {
    for (let line = 0; line < matrix.height; line++) {
      let str = ''

      for (let column = 0; column < matrix.width; column++) {
        const position = new Position(line, column)
        const elem = matrix.get(position)

        if (elem) {
          if (elem.isEdge) {
            str += '*'
          } else {
            if (elem.offsetsInNode.top === 1) {
              const index = elem.offsetsInNode.left - 1
              if (elem.node.content.title.length > index) {
                str += elem.node.content.title[index]
              } else {
                str += '.'
              }
            } else {
              let index =
                (elem.offsetsInNode.top - 2) * (elem.node.dimensions.width - 2)
              index += elem.offsetsInNode.left - 1
              if (elem.node.content.text.length > index) {
                str += elem.node.content.text[index]
              } else {
                str += '.'
              }
            }
          }
        } else {
          str += '_'
        }
      }

      console.log(str)
    }
  }
}
