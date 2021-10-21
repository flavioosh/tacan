import type { Board } from '$lib/board';
import type { LandType, PortType, Tile, TileNumber } from '$types/board';
import type { Seed } from '$types/seed';
import seedrandom from 'seedrandom';

interface RandomGeneratorOptions {
  seed?: Seed;
}

export function generate(board: Board, options?: RandomGeneratorOptions): Tile[][] {
  let { seed } = options;

  if (!seed) {
    // If seed isn't provided, set all individual seeds to null
    seed = {
      resource: null,
      number: null,
      port: null,
    };
  } else if (typeof seed === 'string') {
    // If a string seed is provided, append to it for individual seeds to properly randomise things
    seed = {
      resource: `${seed}-r`,
      number: `${seed}-n`,
      port: `${seed}-p`,
    };
  }

  const resourceRandom = seedrandom(seed.resource);
  const numberRandom = seedrandom(seed.number);
  const portRandom = seedrandom(seed.port);

  const availableResourceTiles = { ...board.data.resourceTiles };
  const availableNumberTiles = { ...board.data.numberTiles };
  const availablePortTiles = { ...board.data.portTiles };

  const resourceTiles: LandType[] = Object.entries(availableResourceTiles)
    .flatMap(([resource, count]) => new Array(count).fill(resource))
    .sort(() => resourceRandom() - 0.5);

  const numberTiles: TileNumber[] = Object.entries(availableNumberTiles)
    .flatMap(([number, count]) => new Array(count).fill(number))
    .sort(() => numberRandom() - 0.5);

  const portTiles: PortType[] = Object.entries(availablePortTiles)
    .flatMap(([port, count]) => new Array(count).fill(port))
    .sort(() => portRandom() - 0.5);

  const gridItems: Tile[][] = new Array(board.rows);
  for (let y = 0; y < board.rows; y++) {
    gridItems[y] = new Array(board.columns);
  }

  for (let y = 0; y < board.rows; y++) {
    for (let x = 0; x < board.columns; x++) {
      if (board.isGridPositionValid(x, y)) {
        if (board.isEdge(x, y)) {
          if (board.isPort(x, y)) {
            const port = board.getPort(x, y);
            gridItems[y][x] = {
              type: 'port',
              resource: portTiles.pop(),
              direction: port.direction,
            };
          } else {
            gridItems[y][x] = {
              type: 'sea',
            };
          }
        } else {
          const resource = resourceTiles.pop();
          if (resource === 'desert') {
            gridItems[y][x] = {
              type: 'desert',
            };
          } else {
            gridItems[y][x] = {
              type: 'resource',
              resource,
              number: numberTiles.pop(),
            };
          }
        }
      } else {
        gridItems[y][x] = null;
      }
    }
  }

  return gridItems;
}
