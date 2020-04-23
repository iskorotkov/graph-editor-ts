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