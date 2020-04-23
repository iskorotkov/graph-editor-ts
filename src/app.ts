import { Content } from "./graphs/content";
import { Dimensions } from "./graphs/dimensions";
import { Graph } from "./graphs/graph";
import { Node } from "./graphs/node";
import { Offsets } from "./graphs/offsets";
import { ConsolePrinter } from "./output/consolePrinter";

let x = new Node(
  new Content(
    "Ромео и Джульетта",
    "Достойно ли смиряться под ударами судьбы, иль надо оказать сопротивленье",
    "У. Шекспир",
    new Date("1970-01-01"),
  ),
);
x.offsets = new Offsets(1, 2);
x.dimensions = new Dimensions(6, 12);

let y = new Node(new Content("Title 2", "Text 2"));
y.dimensions = new Dimensions(1, 2);

let g = new Graph();
g.dimensions = new Dimensions(20, 20);
g.nodes.push(x);
g.nodes.push(y);

let f = new ConsolePrinter();
f.print(g);
