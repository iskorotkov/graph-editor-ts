import { Content } from "./content";
import { Dimensions } from "./dimensions";
import { Offsets } from "./offsets";
import { Position } from "./position";

export class Node {
  constructor(
    public content: Content,
    public offsets: Offsets = new Offsets(),
    public dimensions: Dimensions = new Dimensions(),
  ) {}

  overlaps(point: Position): boolean {
    return (
      point.column >= this.left &&
      point.column <= this.right &&
      point.line >= this.top &&
      point.line <= this.bottom
    );
  }

  onEdge(point: Position): boolean {
    let onVerticalEdges =
      (point.column == this.left || point.column == this.right) &&
      point.line >= this.top &&
      point.line <= this.bottom;
    let onHorizontalEdges =
      (point.line == this.top || point.line == this.bottom) &&
      point.column >= this.left &&
      point.column <= this.right;
    return onVerticalEdges || onHorizontalEdges;
  }

  get left() {
    return this.offsets.left + 1;
  }

  get top() {
    return this.offsets.top + 1;
  }

  get right() {
    return this.offsets.left + this.dimensions.width;
  }

  get bottom() {
    return this.offsets.top + this.dimensions.height;
  }
}
