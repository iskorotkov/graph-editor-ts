import {Offsets} from './offsets'
import {Dimensions} from './dimensions'
import {Content} from './content'
import {Point} from '../canvas/point'

export class Node {
    constructor(public content: Content,
                public offsets: Offsets = new Offsets(),
                public dimensions: Dimensions = new Dimensions()) {
    }

    overlaps(point: Point): boolean {
        return point.x >= this.left && point.x <= this.right
            && point.y >= this.top && point.y <= this.bottom
    }

    onEdge(point: Point): boolean {
        let onVerticalEdges = (point.x == this.left || point.x == this.right)
            && point.y >= this.top && point.y <= this.bottom
        let onHorizontalEdges = (point.y == this.top || point.y == this.bottom)
            && point.x >= this.left && point.x <= this.right
        return onVerticalEdges || onHorizontalEdges
    }

    get left() {
        return this.offsets.left
    }

    get top() {
        return this.offsets.top
    }

    get right() {
        return this.offsets.left + this.dimensions.width - 1
    }

    get bottom() {
        return this.offsets.top + this.dimensions.height - 1
    }
}
