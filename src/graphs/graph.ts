import { Dimensions } from "./dimensions";
import { Node } from "./node";

export class Graph {
  constructor(
    public dimensions: Dimensions = new Dimensions(),
    public nodes: Node[] = [],
  ) {}
}
