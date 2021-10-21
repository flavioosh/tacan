import type { Board } from '$types/board';

export const DEFAULT_BOARD: Board = {
  horizontalTiles: 3,
  diagonalTiles: 3,
  resourceTiles: {
    brick: 3,
    lumber: 4,
    ore: 3,
    grain: 4,
    wool: 4,
    desert: 1,
  },
  numberTiles: {
    2: 1,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    8: 2,
    9: 2,
    10: 2,
    11: 2,
    12: 1,
  },
  portTiles: {
    brick: 1,
    lumber: 1,
    ore: 1,
    grain: 1,
    wool: 1,
    'three-to-one': 4,
  },
  portLocations: [
    {
      position: [3, 0],
      direction: 'downRight',
    },
    {
      position: [5, 0],
      direction: 'downLeft',
    },
    {
      position: [6, 1],
      direction: 'downLeft',
    },
    {
      position: [6, 3],
      direction: 'left',
    },
    {
      position: [4, 5],
      direction: 'upLeft',
    },
    {
      position: [2, 6],
      direction: 'upLeft',
    },
    {
      position: [0, 6],
      direction: 'upRight',
    },
    {
      position: [0, 4],
      direction: 'right',
    },
    {
      position: [1, 2],
      direction: 'right',
    },
  ],
};

export const BIG_BOARD: Board = {
  horizontalTiles: 3,
  diagonalTiles: 4,
  resourceTiles: {
    brick: 5,
    lumber: 6,
    ore: 5,
    grain: 6,
    wool: 6,
    desert: 2,
  },
  numberTiles: {
    2: 2,
    3: 3,
    4: 3,
    5: 3,
    6: 3,
    8: 3,
    9: 3,
    10: 3,
    11: 3,
    12: 2,
  },
  portTiles: {
    brick: 1,
    lumber: 1,
    ore: 1,
    grain: 1,
    wool: 2,
    'three-to-one': 5,
  },
  portLocations: [
    {
      position: [4, 0],
      direction: 'downRight',
    },
    {
      position: [6, 0],
      direction: 'downLeft',
    },
    {
      position: [7, 1],
      direction: 'downLeft',
    },
    {
      position: [7, 4],
      direction: 'left',
    },
    {
      position: [5, 6],
      direction: 'upLeft',
    },
    {
      position: [4, 7],
      direction: 'left',
    },
    {
      position: [2, 8],
      direction: 'upLeft',
    },
    {
      position: [0, 8],
      direction: 'upRight',
    },
    {
      position: [0, 6],
      direction: 'right',
    },
    {
      position: [0, 5],
      direction: 'right',
    },
    {
      position: [1, 3],
      direction: 'right',
    },
  ],
};
