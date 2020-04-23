import {Node} from '../graphs/node'
import {Offsets} from './offsets'
import {Position} from '../graphs/position'

export class OutputInfo {
    constructor(public node: Node,
                public isEdge: boolean,
                public canvasPosition: Position,
                public offsetsInNode: Offsets) {
    }
}