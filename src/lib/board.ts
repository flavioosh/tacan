import type { Board as BoardData, PortLocation, Tile } from '$types/board';

export class Board {
  data: BoardData;

  // Computed values
  rows: number;
  columns: number;
  maxRowColumns: number[];

  constructor(data: BoardData) {
    this.data = data;

    this.rows = data.diagonalTiles * 2 + 1;
    this.columns = data.horizontalTiles + data.diagonalTiles + 1;

    this.maxRowColumns = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      this.maxRowColumns[i] =
        this.data.horizontalTiles + this.rows - Math.max(this.rows - 1 - i, i);
    }
  }

  getAdjacentItems(
    gridItems: Tile[][],
    x: number,
    y: number,
  ): {
    tl: Tile;
    tr: Tile;
    l: Tile;
    r: Tile;
    bl: Tile;
    br: Tile;
  } {
    let tl: Tile;
    let tr: Tile;
    let l: Tile;
    let r: Tile;
    let bl: Tile;
    let br: Tile;

    if (y > 0) {
      tl = gridItems[y - 1][x];

      if (x < gridItems[y - 1].length - 1) {
        tr = gridItems[y - 1][x + 1];
      }
    }

    if (x > 0) {
      l = gridItems[y][x - 1];
    }

    if (x < gridItems[y].length) {
      r = gridItems[y][x + 1];
    }

    if (y < gridItems.length - 1) {
      bl = gridItems[y + 1][x];

      if (x < gridItems[y + 1].length) {
        br = gridItems[y + 1][x + 1];
      }
    }

    return {
      tl,
      tr,
      l,
      r,
      bl,
      br,
    };
  }

  isGridPositionValid(x: number, y: number): boolean {
    return y > this.data.diagonalTiles
      ? this.maxRowColumns[y] > x
      : this.columns - this.maxRowColumns[y] <= x;
  }

  isEdge(x: number, y: number): boolean {
    return (
      this.isGridPositionValid(x, y) &&
      (x === 0 ||
        x === this.columns - 1 ||
        y === 0 ||
        y === this.rows - 1 ||
        (y > this.data.diagonalTiles
          ? this.maxRowColumns[y] <= x + 1
          : this.columns - this.maxRowColumns[y] + 1 > x))
    );
  }

  isPort(x: number, y: number): boolean {
    return this.data.portLocations.some(({ position }) => position[0] === x && position[1] === y);
  }

  getPort(x: number, y: number): PortLocation {
    return this.data.portLocations.find(({ position }) => position[0] === x && position[1] === y);
  }
}
