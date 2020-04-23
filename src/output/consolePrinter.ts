import {Graph} from '../graphs/graph'
import {Point} from '../canvas/point'

export class ConsolePrinter {
    print(graph: Graph) {
        ConsolePrinter.traverse(graph)
    }

    private static traverse(graph: Graph) {
        for (let line = 0; line < graph.dimensions.height; line++) {
            let str = ''
            for (let column = 0; column < graph.dimensions.width; column++) {
                let count = graph.nodes.filter(x => x.overlaps(new Point(column, line))).length
                if (count > 1) {
                    throw new Error('More than one node in given cell')
                }

                let onEdge = false
                for (const node of graph.nodes) {
                    if (node.onEdge(new Point(column, line))) {
                        onEdge = true
                        break
                    }
                }

                str += onEdge ? '*' : '_'
            }

            console.log(str)
        }
    }
}