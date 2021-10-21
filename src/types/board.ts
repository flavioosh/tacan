export type Direction = 'left' | 'upLeft' | 'upRight' | 'right' | 'downRight' | 'downLeft';

export type ResourceType = 'brick' | 'lumber' | 'ore' | 'grain' | 'wool';
export type LandType = ResourceType | 'desert';
export type PortType = ResourceType | 'three-to-one';
export type TileNumber = 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 | 12;

export interface ResourceTile {
  type: 'resource';
  resource: ResourceType;
  number: TileNumber;
}

export interface DesertTile {
  type: 'desert';
}

export interface SeaTile {
  type: 'sea';
}

export interface PortTile {
  type: 'port';
  resource: PortType;
  direction: Direction;
}

export type Tile = ResourceTile | DesertTile | SeaTile | PortTile;

export interface PortLocation {
  position: [number, number];
  direction: Direction;
}

export interface Board {
  horizontalTiles: number;
  diagonalTiles: number;
  resourceTiles: { [key in LandType]: number };
  numberTiles: { [key in TileNumber]: number };
  portTiles: { [key in PortType]: number };
  portLocations: PortLocation[];
}
