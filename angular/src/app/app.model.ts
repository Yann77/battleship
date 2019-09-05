export enum GameStatus {
  CREATED = 'CREATED',
  HOST = 'HOST',
  GUEST = 'GUEST',
  ENDED = 'ENDED'
}

export enum ShipType {
  CARRIER = 'CARRIER',
  BATTLESHIP = 'BATTLESHIP',
  DESTROYER = 'DESTROYER',
  SUBMARINE = 'SUBMARINE',
  PATROL_BOAT = 'PATROL_BOAT'
}

export interface Game {
  gameId: number;
  status: GameStatus;
  name?: string;
  host: Board;
  guest?: Board;
  description?: string;
  gameDt?: Date;
}

export interface Board {
  boardId: number;
  username: string;
  cellList: Array<Cell>;
}

export interface Cell {
  coordinateY: number;
  coordinateX: number;
  type: ShipType;
  touched: boolean;
}

export interface StartedGame {
  gameId: number;
  status: GameStatus;
  host: Board;
  guest: Board;
}

export interface CellCoord {
  coordinateY: number;
  coordinateX: number;
}


