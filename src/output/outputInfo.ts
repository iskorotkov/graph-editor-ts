import { Node } from "../graphs/node";
import { Position } from "../graphs/position";
import { Offsets } from "./offsets";

export class OutputInfo {
  constructor(
    public node: Node,
    public isEdge: boolean,
    public canvasPosition: Position,
    public offsetsInNode: Offsets,
  ) {}
}
