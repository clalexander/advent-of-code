/* eslint-disable max-classes-per-file */
export class GraphNode<T> {
  public readonly children: GraphNode<T>[] = [];

  constructor(public readonly value: T) {}
}

export class Graph<T> {
  public readonly nodes = new Map<T, GraphNode<T>>();

  public getOrAdd(value: T): GraphNode<T> {
    const existing = this.nodes.get(value);
    if (existing) {
      return existing;
    }

    const newNode = new GraphNode(value);
    this.nodes.set(value, newNode);
    return newNode;
  }
}

const makeKey = (x: number, y: number): string => `${x},${y}`;

export const parse = (input: string): [Graph<string>, GraphNode<string>] => {
  const pipesMap = input.split('\n');
  const graph = new Graph<string>();
  let startNode: GraphNode<string> | undefined;

  for (let j = 0; j < pipesMap.length; j++) {
    for (let i = 0; i < pipesMap[j].length; i++) {
      const pipe = pipesMap[j][i];
      if (pipe === '.') {
        continue;
      }
      const key = makeKey(i, j);
      const node = graph.getOrAdd(key);
      const childrenOffsets = [] as [number, number][];
      switch (pipe) {
        case '|':
          childrenOffsets.push([0, 1], [0, -1]);
          break;
        case '-':
          childrenOffsets.push([1, 0], [-1, 0]);
          break;
        case 'F':
          childrenOffsets.push([0, 1], [1, 0]);
          break;
        case '7':
          childrenOffsets.push([0, 1], [-1, 0]);
          break;
        case 'L':
          childrenOffsets.push([0, -1], [1, 0]);
          break;
        case 'J':
          childrenOffsets.push([0, -1], [-1, 0]);
          break;
        case 'S':
          startNode = node;
          if (j > 0 && (pipesMap[j - 1][i] === '|' || pipesMap[j - 1][i] === 'F' || pipesMap[j - 1][i] === '7')) {
            childrenOffsets.push([0, -1]);
          }
          if (i > 0 && (pipesMap[j][i - 1] === '-' || pipesMap[j][i - 1] === 'F' || pipesMap[j][i - 1] === 'L')) {
            childrenOffsets.push([-1, 0]);
          }
          if (j < pipesMap.length - 1 && (pipesMap[j + 1][i] === '|' || pipesMap[j + 1][i] === 'J' || pipesMap[j + 1][i] === 'L')) {
            childrenOffsets.push([0, 1]);
          }
          if (i < pipesMap[j].length - 1 && (pipesMap[j][i + 1] === '-' || pipesMap[j][i + 1] === 'J' || pipesMap[j][i + 1] === '7')) {
            childrenOffsets.push([1, 0]);
          }
          break;
        default:
      }
      node.children
        .push(...childrenOffsets.map(([x, y]) => graph.getOrAdd(makeKey(i + x, j + y))));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return [graph, startNode!];
};
