export interface MultiSeed {
  resource?: string;
  number?: string;
  port?: string;
}

export type Seed = MultiSeed | string;
